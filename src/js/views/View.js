export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
    this._data = data;
    const markup = this._genareteMarkup();
    this._clear(); // Clear the html because iam insert the code not to replace and have some code of html we clear it
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
       <div class="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}