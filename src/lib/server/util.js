import { readdirSync, statSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

export function getWeekEntries(tripId) {
    const folderPath = `static/data/trips/${tripId}/`;
    const files = readdirSync(folderPath);
    // Count .md files
    const mdFiles = files.filter(file => file.endsWith('.md'));
    const totalMdFiles = mdFiles.length;
    // Get last modified date of most recent .md file
    let mostRecentDate = new Date(0); // Initialize with earliest possible date
    mdFiles.forEach(file => {
        const filePath = join(folderPath, file);
        const stats = statSync(filePath);
        if (stats.mtime > mostRecentDate) {
            mostRecentDate = stats.mtime;
        }
    });
    return {
        totalMdFiles,
        mostRecentModifiedDate: mostRecentDate
    };
}

export async function getWeekData(tripId) {
    // Gets the json data from the trip. File may not exist.
    const filePath = join(process.cwd(), 'static', 'data', 'trips', tripId, 'data.json');
    let weekData = null;
    try {
        const fileContent = await readFile(filePath, 'utf-8');
        weekData = JSON.parse(fileContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`File not found for trip ID: ${tripId}`);
        } else {
            console.error(`Error reading file for trip ID ${tripId}:`, error);
        }
    }
    return weekData;
}