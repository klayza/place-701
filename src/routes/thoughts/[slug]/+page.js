import { error } from '@sveltejs/kit';
import { getThought } from '../../../lib/data.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let thoughtID = params.slug;
    let thought = getThought(thoughtID);
    if (thought) {
        return thought;
    }
    else {
        error(404);
    }
}
