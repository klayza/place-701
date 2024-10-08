import { error } from '@sveltejs/kit';
import { thoughts } from '$lib/data.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let thoughtID = params.slug;
    let thought = thoughts.find(thought => thought.id === thoughtID);

    if (thought) {
        return thought;
    }
    else {
        error(404);
    }
}
