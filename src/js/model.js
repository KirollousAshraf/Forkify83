import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
}
console.log(state);

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        // Recreate the object of data but with my syntax
        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            image: recipe.image_url,
            publisher: recipe.publisher,
            ingredients: recipe.ingredients,
            title: recipe.title,
            cookingTime: recipe.cooking_time,
            sourceUrl: recipe.source_url,
            servings: recipe.servings,
        };
    } catch (err) {
        console.error(`${err} 🔴🔴🔴`);
        throw err;

    };
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);
        // console.log(data);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                image: recipe.image_url,
                publisher: recipe.publisher,
                title: recipe.title,
            };
        });
    } catch (err) {
        console.error(`${err} 🔴🔴🔴`);
        throw err;
    }
};
loadSearchResults('pizza')