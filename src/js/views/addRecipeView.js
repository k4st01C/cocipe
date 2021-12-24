'use strict';

import View from './view.js';

class AddRecipeView extends View {
	_parentEl = document.querySelector('.upload');
	_message = 'Recipe successfully uploaded';

	_window = document.querySelector('.add-recipe-window');
	_overlay = document.querySelector('.overlay');
	_btnOpen = document.querySelector('.nav__btn--add-recipe');
	_btnClose = document.querySelector('.btn--close-modal');
	constructor() {
		super(); //just to call this
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
	}

	toggleWindow() {
		this._overlay.classList.toggle('hidden');
		this._window.classList.toggle('hidden');
	}
	_addHandlerShowWindow() {
		this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
	}
	_addHandlerHideWindow() {
		this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
	}

	addHandlerUpload(handler) {
		this._parentEl.addEventListener('submit', function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)]; //this refers to parent object in handler fns
			const data = Object.fromEntries(dataArr); //new method to convert entries to obj
			handler(data);
		});
	}
}

export default new AddRecipeView();
