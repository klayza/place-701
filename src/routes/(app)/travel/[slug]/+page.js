import { error } from '@sveltejs/kit';
import { trips } from '$lib/data.js';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let tripID = params.slug;
    let trip = trips.find(trip => trip.id === tripID);

    if (trip) {
        return trip;
    }
    else {
        error(404);
    }
}
