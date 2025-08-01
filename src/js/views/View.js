export default class View {
  _data;

  render(data, render = true) {

    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  _clear() {
    this._parentElement.innerHTML = '';
  };

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };


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

  renderMessage(message = this._message) {
    const markup = `
       <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>
    `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}