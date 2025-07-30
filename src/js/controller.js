import * as model from './model.js';
import recipeview from './views/recipeView.js';
import searchview from './views/searchView.js';
import resultsview from './views/resultsView.js';
import paginationview from './views/paginationView.js';
import bookmarksview from './views/bookmarksView.js';
import addrecipeview from './views/addrecipeView.js';


// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render the spinner
    recipeview.renderSpinner();

    // render results view to mark selected search results
    resultsview.render(model.getSearchResultsPage());
    bookmarksview.render(model.state.bookmarks);


    // Loading Recipe
    await model.loadRecipe(id);

    // Render recipe for user
    recipeview.render(model.state.recipe);
  } catch (err) {
    // Render error message for user
    recipeview.renderErrorMessage();
    console.error(err);

  }
};


const controlSearchResults = async function () {
  try {
    // Render the spinner
    resultsview.renderSpinner();

    // Get Search Query
    const query = searchview.getQuery();
    if (!query) return;

    // Loading Search Results
    await model.loadSearchResults(query);

    // Render Search Results for user
    // resultsview.render(model.state.search.results); 
    resultsview.render(model.getSearchResultsPage());

    // Render Pagination Buttons
    paginationview.render(model.state.search);
  } catch (err) {
    console.error(err);

  };
};


const controlPaginationbutton = function (goToPage) {
  // Render New Search Results for user
  resultsview.render(model.getSearchResultsPage(goToPage));

  // Render New Pagination Buttons
  paginationview.render(model.state.search);
};


const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeview.render(model.state.recipe);
};


const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }
  console.log(model.state.recipe);

  // Update the recipe view
  recipeview.render(model.state.recipe);

  // Render a bookmarks to user
  bookmarksview.render(model.state.bookmarks);

};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};

const init = function () {
  recipeview.addHendlerRender(controlRecipes);
  recipeview.addHendlerUpdateServings(controlServings);
  recipeview.addHendlerAddBookmark(controlAddBookmark);
  searchview.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPaginationbutton);
  addrecipeview.addHandlerUpload(controlAddRecipe)
}
init();