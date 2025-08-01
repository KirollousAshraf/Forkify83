import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';


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
// console.log(state);




export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        // console.log(data);


        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);


        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;

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
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });
    } catch (err) {
        console.error(`${err} 🔴🔴🔴`);
        throw err;
    };
    state.search.page = 1;
};


export const getSearchResultsPage = function (page = state.search.page) {
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


// Fucntions of BookMarks //
const setBookmarksToLocalStorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};


export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;


    setBookmarksToLocalStorage();
};

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) state.recipe.bookmarked = false;

    setBookmarksToLocalStorage();

};

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();
console.log(state.bookmarks);
