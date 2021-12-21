'use strict';
import View from './view.js';

class BookmarksView extends View {
	_parentEl = document.querySelector('.bookmarks__list');
	_errorMessage = 'No bookmarks yet.';
	_message = '';

	_generateMarkup() {
		return this._data.reduce((ac, e) => {
			ac += `<li class='preview'>
			<a class='preview__link' href='#${e.id}'>
				<figure class='preview__fig'>
					<img src=${e.image} alt=${e.title} />
				</figure>
				<div class='preview__data'>
					<h4 class='preview__title'>${e.title}</h4>
					<p class='preview__publisher'>${e.publisher}</p>
				</div>
			</a>
		</li>;`;
			return ac;
		}, ``);
	}

	addHandlerBookmarks(handler) {
		document.querySelector('.nav__btn--bookmarks').addEventListener('mouseenter', function () {
			// if (!this._data) return;
			handler();
		});
	}

	addHandlerRender(handler) {
		window.addEventListener('load', handler);
	}
}

export default new BookmarksView();
