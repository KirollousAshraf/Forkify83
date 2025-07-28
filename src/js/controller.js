import * as model from './model.js';
import recipeview from './views/recipeView.js';
import searchview from './views/searchView.js';
import resultsview from './views/resultsView.js';
import paginationview from './views/paginationView.js';
///////////////////////////////////////
const controlRecipe = async function () {
  try {
    // get the id automatic when click the anchor
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Show user a loading spinner
    recipeview.renderSpinner();
    // Loading Recipe and show the result into console not to user
    await model.loadRecipe(id);
    // Show Recipe to User in Html
    recipeview.render(model.state.recipe);
  } catch (err) {
    // Show the Error Message to user
    recipeview.renderErrorMessage();
    console.error(err);
  }

};


const controlSearchResults = async function () {
  try {
    resultsview.renderSpinner();

    // Get query from Search Value
    const query = searchview.getQuery();
    if (!query) return;

    // loading Search recipe
    await model.loadSearchResults(query);

    // render Search results to user
    // resultsview.render(model.state.search.results);
    resultsview.render(model.searchResultsPage());

    // render pagination buttons when user search a recipe
    paginationview.render(model.state.search)

  } catch (err) {
    console.error(err);
  };
};

const controlPaginationButtons = function (goToPage) {

  // render Search results to user
  resultsview.render(model.searchResultsPage(goToPage));

  // render pagination buttons when user search a recipe
  paginationview.render(model.state.search)

};

const controlServings = function (newServings) {

  // Update serving recipe
  model.updateServings(newServings);

  // Update to show the new Recipe for user
  recipeview.render(model.state.recipe);

};

const init = function () {
  recipeview.addHandlerEvents(controlRecipe);
  recipeview.addHandlerUpdateServings(controlServings)
  searchview.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPaginationButtons);

}
init();
