import fs from 'node:fs/promises';
import path from 'node:path';
import { Manifest, PublisherConfig } from './types.js';

function manifestPath(config: PublisherConfig): string {
	return path.join(config.rootDir, 'manifest', 'uploaded-images.json');
}

export async function loadManifest(config: PublisherConfig): Promise<Manifest> {
	try {
		const raw = await fs.readFile(manifestPath(config), 'utf8');
		return JSON.parse(raw) as Manifest;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
		throw error;
	}
}

export async function saveManifest(config: PublisherConfig, manifest: Manifest): Promise<void> {
	if (config.dryRun || config.check) return;
	await fs.mkdir(path.dirname(manifestPath(config)), { recursive: true });
	await fs.writeFile(manifestPath(config), `${JSON.stringify(manifest, null, 2)}\n`);
}
