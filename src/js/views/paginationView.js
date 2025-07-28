import View from "./View.js";
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  };

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    // console.log(numPages);

    // Page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._getPaginationButtonNext(curPage);
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._getPaginationButtonPrev(curPage);


    }

    // other Page
    if (curPage < numPages) {
      return this._getPaginationButtons(curPage)
    }

    // Page 1 , and there are No other pages
    return 'only one page';
  };

  _getPaginationButtonPrev(curPage) {
    return `
        <button data-goto='${curPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
  };

  _getPaginationButtonNext(curPage) {
    return `
       <button data-goto='${curPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
         </button>
        `;
  };

  _getPaginationButtons(curPage) {
    return `
        <button data-goto='${curPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
        <button data-goto='${curPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
            `;
  };

}
export default new PaginationView();