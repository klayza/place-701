import { error } from '@sveltejs/kit';
import trips from '/src/lib/data/trips.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let { slug, trip } = params;
    slug = slug.replace("w", "");

    trips.forEach((t) => {
        if (t.id === trip) {
            trip = t;
        }
    });

    console.log(trips);
    return {
        trip,
        slug
    };

    throw error(404, 'Not found');
}
