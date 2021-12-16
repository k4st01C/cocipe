'use strict';
import { API_URL } from './config.js';
import { getJson } from './helpers.js';

export const state = {
	recipe: {},
	search: {
		query: {},
		recipes: [],
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
		state.search.query = query;
		state.search.recipes = recipes.map(recipe => {
			return {
				id: recipe.id,
				image: recipe.image_url,
				publisher: recipe.publisher,
				title: recipe.title,
			};
		});
		console.log(state);
	} catch (error) {
		throw error;
	}
}
