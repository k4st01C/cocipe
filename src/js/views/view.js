'use strict';
import icons from 'url:../../img/icons.svg';

export default class View {
	_data;
	render(data) {
		this._data = data;
		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
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
