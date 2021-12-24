'use strict';
import { API_URL } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
	recipe: {},
	search: {
		query: {},
		recipes: [],
		page: 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
	bookmarks: [],
};

function createRecipeObject(data) {
	const { recipe } = data.data;
	return {
		id: recipe.id,
		title: recipe.title,
		publisher: recipe.publisher,
		sourceUrl: recipe.source_url,
		image: recipe.image_url,
		servings: recipe.servings,
		cookingTime: recipe.cooking_time,
		ingredients: recipe.ingredients,
		//conditionally add values to object
		...(recipe.key && { key: recipe.key }),
	};
}

export async function loadRecipe(id) {
	try {
		const data = await AJAX(API_URL + id);
		state.recipe = createRecipeObject(data);
		//ensure bookmarked persists after reload
		state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id) ? true : false;
	} catch (error) {
		throw error;
	}
}

export async function loadSearchResults(query) {
	try {
		const data = await AJAX(`${API_URL}?search=${query}`);
		const { recipes } = data.data;
		if (!recipes[0]) throw new Error('No results!');
		state.search.query = query;
		state.search.recipes = recipes.map(recipe => {
			return {
				id: recipe.id,
				image: recipe.image_url,
				publisher: recipe.publisher,
				title: recipe.title,
			};
		});
	} catch (error) {
		throw error;
	}
}

export function updateServings(newServings) {
	const curServing = state.recipe.servings;
	state.recipe.ingredients.forEach(
		ing => (ing.quantity = (ing.quantity / curServing) * newServings),
	);
	state.recipe.servings = newServings;
}

export function getResultsPerPage(page = 1) {
	state.search.page = page;
	return state.search.recipes.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);
}

export function addBookmark(recipe) {
	state.bookmarks.push(recipe);
	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
	persistBookmarks();
}

export function deleteBookmark(id) {
	const idx = state.bookmarks.findIndex(el => el.id === id);
	state.bookmarks.splice(idx, 1);
	state.recipe.bookmarked = false;
	if (id === state.recipe.id) state.recipe.bookmarked = false;
	persistBookmarks();
}

//store bookmarks to local storage
function persistBookmarks() {
	localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

function init() {
	const storage = localStorage.getItem('bookmarks');
	if (storage) state.bookmarks = JSON.parse(storage);
}

export async function uploadRecipe(newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter(entry => entry[0].startsWith('ingredient') && entry[1])
			.map(ing => {
				const ingArray = ing[1].replaceAll(' ', '').split(',');
				if (ingArray.length !== 3) throw new Error('Wrong ingredient format! please add commas');
				const [quantity, unit, description] = ingArray;
				return {
					quantity: quantity ? +quantity : null,
					unit,
					description,
				};
			});

		const recipe = {
			title: newRecipe.title,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			publisher: newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			ingredients,
		};

		const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
		state.recipe = createRecipeObject(data);
		addBookmark(state.recipe);
	} catch (error) {
		throw error;
	}
}

init();
