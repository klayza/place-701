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



export 	function timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years}y ago`;
    } else if (months > 0) {
        return `${months}mo ago`;
    } else if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `${seconds}s ago`;
    }
}
