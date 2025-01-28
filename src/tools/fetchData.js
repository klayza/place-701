// This script fetches data from a remote GitHub repository and stores it locally
// The data is used for the place-701 project

import { execSync } from 'child_process'; // Used to execute git commands
import fs from 'fs'; // File system operations
import path from 'path'; // Path manipulation utilities

// Configuration constants
const DATA_REPO = 'https://github.com/klayza/place-701-data'; // Source repository URL
const TARGET_DIR = path.resolve('./static/data'); // Destination directory for the data

// Create the target directory if it doesn't exist
// This ensures we have a valid location to copy the data to
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Set up temporary directory for git operations
const TEMP_DIR = path.resolve('./.temp-place-701-data');

// Check if we already have the repository cloned
if (fs.existsSync(TEMP_DIR)) {
    // If repository exists, update it with latest changes
    console.log('Updating existing data repository...');
    execSync(`git -C ${TEMP_DIR} pull`, { stdio: 'inherit' });
} else {
    // If repository doesn't exist, clone it fresh
    console.log('Cloning data repository...');
    execSync(`git clone ${DATA_REPO} ${TEMP_DIR}`, { stdio: 'inherit' });
}
// Sync the data to the static folder
console.log('Copying data to /static/data...');
// Remove existing data in target directory to ensure clean state
fs.rmSync(TARGET_DIR, { recursive: true, force: true });

// Copy all contents from temporary directory to target directory except for .git
const copyDirectory = (src, dest) => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((item) => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (item === '.git') {
            return; // Skip .git directory
        }

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};

copyDirectory(TEMP_DIR, TARGET_DIR);

console.log('Data sync complete.');
