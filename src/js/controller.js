import * as model from './model.js';
import recipeview from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');


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
    recipeview.render(model.state.recipe)



  } catch (err) {
    alert(err)
  }

};

const init = function () {
  recipeview.addHandlerEvents(controlRecipe);
}
init();
