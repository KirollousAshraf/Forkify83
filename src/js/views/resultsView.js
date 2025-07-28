import View from "./View.js";
import previewview from "./previewView.js";
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `We Can Not Find A Recipe For you Query ! Please Try Agian`;
  _message = ``;

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => previewview.render(result, false)).join('');
  };
};

export default new ResultsView();