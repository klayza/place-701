import { trip_data } from "./data";

export function getWeekEntries(tripId) {
    const weekData = trip_data[tripId] || [];
    const totalMdFiles = weekData.length;
   
    // Find the most recent update date
    const mostRecentDate = weekData.reduce((mostRecent, week) => {
        if (week.updated) {
            const updateDate = new Date(week.updated);
            return updateDate > mostRecent ? updateDate : mostRecent;
        }
        return mostRecent;
    }, new Date(0));

    return {
        totalMdFiles,
        mostRecentModifiedDate: mostRecentDate
    };
}

export async function getWeekData(tripId) {
    // Directly return the data from trip_data
    return trip_data[tripId] || null;
}