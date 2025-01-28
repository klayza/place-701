/* 

1. Run script
2. Script reads all files in /static/data/trips/
3. Each folder in /trips has the attachments and .md files. If there is only 1 .md  file (besides the meta.md file) then it's a single trip, if there are multiple .md files then it's a collection.
4. For each folder, the script reads the meta.md file and the .md files and generates the approximate output below.
5. The output is saved in /src/lib/data/trips.json

*/


/* meta.md example
---
title: Japan
description: Woohoo! Japan!
start: 2025-01-20
end: 2025-01-29
---

*/



/* w1.md example
---
tags:
  - camping
  - oregon
title: San Francisco
cover: original.jpg
date: 2025-01-20
---
Sup yall this is my blog!!!!!

![[original.jpg]]

Cool sky I saw.

![[original 1.jpg]]

This is my kitty, Sampson.

![[original 2.jpg]]

These are my pet frongs.

![[PXL_20250112_022054081.mp4]]

This is a video that totally worked the first time.
*/



/* ~~~Expected output:

[
    {
        name: 'Pacific West Coast', (from west-cost-2024/meta.md)
        id: 'west-coast-2024', (from the folder name)
        type: 'collection', (single or collection)
        start: 'April 29, 2024', (the earlist date in the collection)
        end: 'September 7, 2024', (the latest date in the collection)
        pictures: 119, (total number of pictures in west-coast-2024/attachments/)
        img: '0812-7.jpg',
        data: [
            {
                title: 'San Francisco', (from the md file properties)
                id: '1', (from the md file name, ex: w1.md)
                date: 'April 29, 2024', (from the md file properties)
                pictures: 10, (calculated from the number of mentions of file extensions in the folder)
                cover: '0812-7.jpg', (from properties)
                tags: ['camping', 'hiking', 'beach'] (from properties)
            }, ...
        ]
    },
    {
        name: 'Japan', (from japan-2023/meta.md)
        id: 'japan-2023', (from the folder name)
        type: 'single', (single because there is only 1 .md file)
        start: 'May 24, 2023', (from meta.md)
        end: 'June 2, 2023',
        pictures: 30, (from the number of files in japan-2023/attachments/)
        img: '/img/travel.png'
    }
];

*/






import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

const TRIPS_DIR = './static/data/trips';
const OUTPUT_FILE = './src/lib/data/trips.json';

async function getTripData() {
    // Get all directories in the trips folder
    const tripDirs = await fs.readdir(TRIPS_DIR);
    const tripsData = [];

    for (const dirName of tripDirs) {
        const dirPath = path.join(TRIPS_DIR, dirName);
        const stats = await fs.stat(dirPath);

        if (!stats.isDirectory()) continue;

        // Read all files in the directory
        const files = await fs.readdir(dirPath);
        const mdFiles = files.filter(file => file.endsWith('.md'));
        const attachmentsPath = path.join(dirPath, 'attachments');

        // Read meta.md file
        let meta = { title: '', description: '', start: '', end: '', hidden: false };
        try {
            const metaContent = await fs.readFile(path.join(dirPath, 'meta.md'), 'utf-8');
            meta = matter(metaContent).data;
        } catch (error) {
            console.warn(`meta.md file not found for ${dirName}`);
        }

        // Count pictures in attachments folder
        let pictureCount = 0;
        try {
            const attachments = await fs.readdir(attachmentsPath);
            pictureCount = attachments.length;
        } catch (error) {
            console.warn(`No attachments folder found for ${dirName}`);
        }

        // Determine if it's a single trip or collection
        const type = mdFiles.length === 2 ? 'single' : 'collection'; // 2 because of meta.md
        const tripData = {
            name: meta.title,
            id: dirName,
            type,
            description: meta.description,
            start: meta.start ? format(new Date(meta.start), 'MMMM d, yyyy') : '',
            end: meta.end ? format(new Date(meta.end), 'MMMM d, yyyy') : '',
            pictures: pictureCount,
            cover: meta.cover ? (meta.cover.startsWith('/') ? meta.cover : `/data/trips/${dirName}/attachments/${meta.cover}`) : '',
            hidden: meta.hidden || false
        };

        const entries = [];
        const contentFiles = mdFiles.filter(file => file !== 'meta.md');

        for (const file of contentFiles) {
            const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
            const { data: frontmatter } = matter(content);

            // Count pictures and videos referenced in the content
            const referencedPictures = content.split('\n').filter(line =>
                line.includes('.jpg') || line.includes('.png') || line.includes('.jpeg') ||
                line.includes('.webp') || line.includes('.gif') || line.includes('.mp4') ||
                line.includes('.mkv')
            ).length;

            entries.push({
                title: frontmatter.title,
                id: path.basename(file, '.md').replace('w', ''),
                date: frontmatter.date ? format(new Date(frontmatter.date), 'MMMM d, yyyy') : '',
                pictures: referencedPictures,
                cover: frontmatter.cover ? `/data/trips/${dirName}/attachments/${frontmatter.cover}` : '',
                tags: frontmatter.tags || []
            });
        }

        // Sort entries by date
        entries.sort((a, b) => new Date(a.date) - new Date(b.date));

        // For collections, set the img to the cover of the first entry
        tripData.cover = entries[0]?.cover || '/img/travel.png';
        tripData.entries = entries;

        tripsData.push(tripData);
    }

    // Sort trips by start date
    return tripsData.sort((a, b) => new Date(b.start) - new Date(a.start));
}

async function main() {
    try {
        const data = await getTripData();
        await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
        await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2));
        console.log('Trip data successfully generated!');
    } catch (error) {
        console.error('Error generating trip data:', error);
        process.exit(1);
    }
}

main();