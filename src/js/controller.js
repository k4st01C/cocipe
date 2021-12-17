'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import results from './views/results.js';
import paginationView from './views/paginationView.js';
const recipeContainer = document.querySelector('.recipe');

// Check if HMR interface is enabled
//rebuild without page reload in browser
if (module.hot) {
	// Accept hot update
	module.hot.accept();
}

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
		results.renderSpinner();
		await model.loadSearchResults(query);
		controlPagination();
	} catch (err) {
		results.renderError(err);
	}
}

function controlPagination(gotoPage) {
	results.render(model.getResultsPerPage(gotoPage));
	paginationView.render(model.state.search);
}

(function init() {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerPagination(controlPagination);
})();
