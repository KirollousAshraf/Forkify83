import { API_URL } from "./config.js";
export const state = {
    recipe: {},
}

export const loadRecipe = async function (id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} ${res.status}`);
        console.log(res, data);
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
        console.log(recipe);
    } catch (err) {
        console.log(err);

    };
}