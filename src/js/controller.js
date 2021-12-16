'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
const recipeContainer = document.querySelector('.recipe');

// 39f7aa97-64cf-432e-9dff-f568ea77977c

/////////////////////////////////////

async function controlRecipes() {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner();
		await model.loadRecipe(id);
		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError(err);
	}
}

async function controlSearchResults() {
	try {
		const query = searchView.getQuery();
		if (!query) return;
		await model.loadSearchResults(query);
	} catch (err) {
		recipeView.renderError(err);
		console.error(err);
	}
}

(function init() {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
})();
