import { error } from '@sveltejs/kit';
import { recipes } from '$lib/data.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let id = params.slug;
    let recipe = recipes.find(recipe => recipe.id === id);

    if (recipe) {
        return recipe;
    }
    else {
        error(404);
    }
}
