import { error } from '@sveltejs/kit';
import trips from '/src/lib/data/trips.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let { slug } = params;
    slug = slug.replace("w", "");
    for (const trip of trips) {
        for (const entry of trip.entries) {
            if (entry.id === slug) {
                return {
                    trip: trip,
                    slug
                };
            }
        }
    }

    throw error(404, 'Not found');
}
