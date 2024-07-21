import { getWeekEntries } from '$lib/server/util.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
    const { totalMdFiles, mostRecentModifiedDate } = getWeekEntries();
    return {
        totalMdFiles,
        mostRecentModifiedDate
    };
}