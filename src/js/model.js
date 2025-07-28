import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
////////////////////////////////////////////////////////

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};
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

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }

    } catch (err) {
        console.error(`${err} 🔴🔴🔴`);
        throw err;

    };
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        // console.log(state.search.query);

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

        state.search.page = 1;
    } catch (err) {
        console.error(`${err} 🔴🔴🔴`);
        throw err;
    }
};

export const searchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    // console.log(state.search.page);

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);
    console.log(state.bookmarks);

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);


    if (id === state.recipe.id) state.recipe.bookmarked = false;
};