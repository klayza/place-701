import { error } from '@sveltejs/kit';
import trips from '/src/lib/data/trips.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let tripID = params.slug;
    let trip = trips.find(trip => trip.id === tripID);

    if (trip) {
        return trip;
    } else {
        throw error(404);
    }
}
