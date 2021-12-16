'use strict';

export default class View {
    #errorMessage;
	#data;
	#parentEl = document.querySelector('.recipe');
	#successMessage;
	render(data) {
		this.#data = data;
		this.#clear();
		this.#parentEl.insertAdjacentHTML('afterbegin', this.#generateMarkup());
	}

	#clear() {
		this.#parentEl.innerHTML = '';
	}

	renderSpinner() {
		this.#clear();
		const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
		this.#parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	

	addHandlerRender(handler) {
		['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
	}

	renderError(err = this.#errorMessage) {
		this.#clear();
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
		this.#parentEl.insertAdjacentHTML('afterbegin', markup);
	}

	renderMessage(message = this.#successMessage) {
		this.#clear();
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
		this.#parentEl.insertAdjacentHTML('afterbegin', markup);
	}
}
}
