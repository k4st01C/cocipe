'use strict';
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
	_parentEl = document.querySelector('.results');
	_errorMessage = 'No results found!';
	_successMessage;

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
}

export default new ResultsView();
