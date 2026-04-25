import fg from 'fast-glob';
import { ParsedNote, PublisherConfig } from './types.js';
import { parseMarkdownFile } from './parseMarkdown.js';

export async function scanVault(config: PublisherConfig): Promise<ParsedNote[]> {
	const files = await fg('**/*.md', {
		cwd: config.contentRoot,
		absolute: true,
		onlyFiles: true,
		dot: false,
		ignore: ['**/attachments/**/*.md', '**/_attachments/**/*.md']
	});

	const notes = await Promise.all(files.sort().map((file) => parseMarkdownFile(config, file)));
	return notes;
}
