import { getWeekEntries, getWeekData } from '$lib/server/util.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const tripId = "west-coast-2024";
    const { totalMdFiles, mostRecentModifiedDate } = getWeekEntries(tripId);
    const weekData = await getWeekData(tripId);
    return {
        totalMdFiles,
        mostRecentModifiedDate,
        weekData
    };
}