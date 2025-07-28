import View from "./View.js";
import previewview from "./previewView.js";
class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = `No Bookmarks Yet . Find a Nice Recipe and Bookmark it;`;
    _message = ``;

    _generateMarkup() {
        // console.log(this._data);
        return this._data.map(bookmark => previewview.render(bookmark, false)).join('');
    };

};



export default new BookmarksView();