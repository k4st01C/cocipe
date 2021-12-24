'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import results from './views/results.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

//
// Check if HMR interface is enabled
//rebuild without page reload in browser
if (module.hot) {
	// Accept hot update
	module.hot.accept();
}

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
		console.log(err);
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

function controlServings(newServings) {
	//update model state
	model.updateServings(newServings);
	//update DOM view
	recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);
	recipeView.update(model.state.recipe);
	controlBookmarks();
}

function controlBookmarks() {
	bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
	try {
		addRecipeView.renderSpinner();
		await model.uploadRecipe(newRecipe);
		addRecipeView.renderMessage();
		recipeView.render(model.state.recipe);
		bookmarksView.render(model.state.bookmarks);
		//change id in the URL
		window.history.pushState(null, '', `#${model.state.recipe.id}`);
		setTimeout(() => {
			addRecipeView.toggleWindow();
			fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(uploadData),
			});
		}, MODAL_CLOSE_SEC * 1000);
		location.reload();
	} catch (error) {
		addRecipeView.renderError(error.message);
	}
}

(function init() {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerPagination(controlPagination);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	bookmarksView.addHandlerRender(controlBookmarks);
	addRecipeView.addHandlerUpload(controlAddRecipe);
})();
