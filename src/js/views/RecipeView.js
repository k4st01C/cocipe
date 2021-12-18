'use strict';
import icons from 'url:../../img/icons.svg';
import View from './view.js';
import { Fraction } from 'fractional';

class RecipeView extends View {
	_errorMessage = 'We could not find the recipe. Please try another one!';
	_parentEl = document.querySelector('.recipe');
	_successMessage;

	_generateMarkup() {
		return `
        <figure class="recipe__fig">
          <img src=${this._data.image} alt=${this._data.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
							this._data.cookingTime
						}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${
								this._data.servings - 1
							}">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${
								this._data.servings + 1
							}">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}_icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._generateMarkupIngredients(this._data.ingredients)}

          </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href=${this._data.sourceUrl}></use>
            </svg>
          </a>
        </div>`;
	}

	_generateMarkupIngredients(ingredients) {
		return ingredients.reduce((ac, e) => {
			ac += `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
								e.quantity ? new Fraction(e.quantity).toString() : ''
							}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${e.unit}</span>
                ${e.description}
              </div>
            </li>`;
			return ac;
		}, '');
	}

	addHandlerRender(handler) {
		['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
	}

	addHandlerUpdateServings(handler) {
		this._parentEl.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn--increase-servings');
			if (!btn) return;
			let updateTo = +btn.dataset.updateTo;
			if (updateTo > 0 && updateTo < 11) handler(+btn.dataset.updateTo);
		});
	}
}

export default new RecipeView();
