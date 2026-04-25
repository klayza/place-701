import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { NoteFrontmatter, ParsedNote, PublisherConfig } from './types.js';
import { toPosixPath } from './utils.js';

export async function parseMarkdownFile(config: PublisherConfig, sourcePath: string): Promise<ParsedNote> {
	const raw = await fs.readFile(sourcePath, 'utf8');
	const parsed = matter(raw);

	return {
		sourcePath,
		relativePath: toPosixPath(path.relative(config.contentRoot, sourcePath)),
		body: parsed.content.trimStart(),
		frontmatter: parsed.data as NoteFrontmatter
	};
}

export function stringifyMarkdown(frontmatter: NoteFrontmatter, body: string): string {
	return matter.stringify(body.trimStart(), frontmatter).trimEnd() + '\n';
}
