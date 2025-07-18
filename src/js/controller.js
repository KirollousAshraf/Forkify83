import * as model from './model.js';
import recipeview from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
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
const events = ['hashchange', 'load'];
events.forEach(event => window.addEventListener(event, controlRecipe));

