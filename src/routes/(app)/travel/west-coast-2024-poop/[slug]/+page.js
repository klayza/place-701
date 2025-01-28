import { error } from '@sveltejs/kit';
import { trips } from '$lib/data.js';
import { trip_data } from '$lib/data.js';
import { page } from '$app/stores';

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
    let pathSegments = url.pathname.split('/');
    let tripID = pathSegments[pathSegments.length - 2]; 
    let weekNum = parseInt(params.slug.replace("w", ""))
    // Assuming you want to use this to find a trip
    let trip = trips.find(trip => trip.id === tripID);
    let week = trip_data[tripID].find(week => week.id === weekNum)

    if (trip) {
        return {trip, week};
    }
    else {
        throw error(404, 'Trip not found');
    }
}
