'use strict';
import { API_URL } from './config.js';
import { RESULTS_PER_PAGE } from './config.js';
import { getJson } from './helpers.js';

export const state = {
	recipe: {},
	search: {
		query: {},
		recipes: [],
		page: 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
};

export async function loadRecipe(id) {
	try {
		const data = await getJson(API_URL + id);
		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
	} catch (error) {
		throw error;
	}
}

export async function loadSearchResults(query) {
	try {
		const data = await getJson(`${API_URL}?search=${query}`);
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

export function getResultsPerPage(page = 1) {
	state.search.page = page;
	return state.search.recipes.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);
}
