// Pull remote data from htttps://github.com/klayza/place-701-data
// put items from place-701-data in /static/data/ folder

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const DATA_REPO = 'https://github.com/klayza/place-701-data';
const TARGET_DIR = path.resolve('./static/data');

// Ensure the target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Clone or pull the repository
const TEMP_DIR = path.resolve('./.temp-place-701-data');

if (fs.existsSync(TEMP_DIR)) {
  console.log('Updating existing data repository...');
  execSync(`git -C ${TEMP_DIR} pull`, { stdio: 'inherit' });
} else {
  console.log('Cloning data repository...');
  execSync(`git clone ${DATA_REPO} ${TEMP_DIR}`, { stdio: 'inherit' });
}

// Copy contents to the static folder
console.log('Copying data to /static/data...');
fs.rmSync(TARGET_DIR, { recursive: true, force: true });
fs.cpSync(path.join(TEMP_DIR), TARGET_DIR, { recursive: true });

console.log('Data sync complete.');
