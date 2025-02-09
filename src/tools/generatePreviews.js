import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const links = JSON.parse(fs.readFileSync('./src/lib/data/links.json', 'utf-8'));

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output directory for the images
const outputDir = path.resolve(__dirname, '../../static/img/links');

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const { url } of links) {
        try {
            const filename = `${new URL(url).hostname}.png`; // Use the hostname for filenames

            // Before doing anything check if we already have a screenshow
            if (fs.existsSync(path.join(outputDir, filename))) {
                console.log(`Preview already exists for ${url}, skipping...`);
                continue;
            }

            // Go to the URL and take a screenshot
            await page.goto(url, { waitUntil: 'networkidle2' });
            const filePath = path.join(outputDir, filename);
            await page.screenshot({ path: filePath });

            console.log(`Saved preview to ${filePath}`);
        } catch (error) {
            console.error(`Failed to generate preview for ${url}:`, error.message);
        }
    }

    await browser.close();
    console.log('All previews generated!');
})();
