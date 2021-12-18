'use strict';
import icons from 'url:../../img/icons.svg';

export default class View {
	_data;
	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
		this._data = data;
		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
	}

	update(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
		this._data = data;
		const newMarkup = this._generateMarkup();
		//convert markup to virtualDom
		const newDom = document.createRange().createContextualFragment(newMarkup);
		//convert new Dom and current Dom to Arrays
		const newElements = Array.from(newDom.querySelectorAll('*'));
		const curElements = Array.from(this._parentEl.querySelectorAll('*'));
		//compare Arrays
		newElements.forEach((e, i) => {
			//change text
			if (!e.isEqualNode(curElements[i]) && e.firstChild?.nodeValue.trim() !== '')
				curElements[i].textContent = e.textContent;
			//change attributes
			if (!e.isEqualNode(curElements[i])) {
				Array.from(e.attributes).forEach(attr =>
					curElements[i].setAttribute(attr.name, attr.value),
				);
			}
		});
	}
	_clear() {
		this._parentEl.innerHTML = '';
	}

	renderSpinner() {
		this._clear();
		const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderError(err = this._errorMessage) {
		this._clear();
		const markup = `
		<div class="error">
      		<div>
			<svg>
				<use href='${icons}#icon-alert-triangle'></use>
			</svg>
			<p>${err}</p>
			</div>
		</div>;
        `;
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderMessage(message = this._successMessage) {
		this._clear();
		const markup = `
		<div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>
        `;
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}
}
