'use strict';
import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
	_parentEl = document.querySelector('.pagination');

	_generateMarkup() {
		const numPages = Math.ceil(this._data.recipes.length / this._data.resultsPerPage);
		const page = this._data.page;
		const leftBtn = `
		<button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
		    <svg class="search__icon">
		      <use href="${icons}#icon-arrow-left"></use>
		    </svg>
		    <span>Page ${page - 1}</span>
		  </button>`;
		const rightBtn = `
          <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
		    <span>Page ${page + 1}</span>
		    <svg class="search__icon">
		      <use href="${icons}#icon-arrow-right"></use>
		    </svg>
		  </button>`;

		//on page 1 and only 1 page
		if (page === 1 && numPages === 1) return '';
		//on page 1
		if (page === 1) return rightBtn;
		//on last page
		if (page === numPages) return leftBtn;
		//other pages
		return leftBtn + rightBtn;
	}

	addHandlerPagination(handler) {
		this._parentEl.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn--inline');
			if (!btn) return;
			const gotoPage = +btn.dataset.goto;
			handler(gotoPage);
		});
	}
}

export default new PaginationView();
