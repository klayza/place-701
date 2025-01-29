import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const DATA_REPO = 'https://github.com/klayza/place-701-data';
const TARGET_DIR = path.resolve('./static/data');
const TEMP_DIR = path.resolve('./.temp-place-701-data');

const syncData = async () => {
    try {
        // Git operations
        if (fs.existsSync(TEMP_DIR)) {
            console.log('Updating existing data repository...');
            execSync(`git -C ${TEMP_DIR} pull`, { stdio: 'inherit' });
        } else {
            console.log('Cloning data repository...');
            execSync(`git clone ${DATA_REPO} ${TEMP_DIR}`, { stdio: 'inherit' });
        }

        // Simple remove and copy
        console.log('Syncing data...');
        await fs.emptyDir(TARGET_DIR);
        await fs.copy(TEMP_DIR, TARGET_DIR, {
            filter: (src) => !src.includes('.git')
        });

        console.log('Data sync complete.');
    } catch (error) {
        console.error('Data sync failed:', error);
        process.exit(1);
    }
};

syncData();