import fs from 'node:fs/promises';
import path from 'node:path';
import { ExportedPost, MediaIndexItem, NoteFrontmatter, ParsedNote, PublisherConfig } from './types.js';
import { stringifyMarkdown } from './parseMarkdown.js';
import { ensureArray, formatDate } from './utils.js';

export async function exportMarkdown(config: PublisherConfig, note: ParsedNote, frontmatter: NoteFrontmatter, body: string): Promise<{ outputPath: string; relativePath: string }> {
	const relativePath = note.relativePath;
	const outputPath = path.join(config.outputDir, relativePath);

	if (!config.dryRun && !config.check) {
		await fs.mkdir(path.dirname(outputPath), { recursive: true });
		await fs.writeFile(outputPath, stringifyMarkdown(frontmatter, body));
	}

	return { outputPath, relativePath };
}

export function toExportedPost(frontmatter: NoteFrontmatter, relativePath: string): ExportedPost {
	return {
		title: String(frontmatter.title),
		slug: String(frontmatter.slug),
		type: String(frontmatter.type),
		date: formatDate(frontmatter.date),
		updated: frontmatter.updated ? formatDate(frontmatter.updated) : undefined,
		description: frontmatter.description ? String(frontmatter.description) : '',
		tags: ensureArray(frontmatter.tags),
		path: relativePath,
		cover: frontmatter.cover ? String(frontmatter.cover) : null
	};
}

export async function writeIndexes(config: PublisherConfig, posts: ExportedPost[], media: MediaIndexItem[]): Promise<void> {
	const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
	const tags = buildTags(sortedPosts);

	if (config.dryRun || config.check) return;

	await fs.mkdir(config.outputDir, { recursive: true });
	await fs.writeFile(path.join(config.outputDir, 'index.json'), `${JSON.stringify(sortedPosts, null, 2)}\n`);
	await fs.writeFile(path.join(config.outputDir, 'tags.json'), `${JSON.stringify(tags, null, 2)}\n`);
	await fs.writeFile(path.join(config.outputDir, 'media.json'), `${JSON.stringify(media, null, 2)}\n`);
}

function buildTags(posts: ExportedPost[]): Record<string, string[]> {
	const tags: Record<string, string[]> = {};

	for (const post of posts) {
		for (const tag of post.tags) {
			tags[tag] ??= [];
			tags[tag].push(post.slug);
		}
	}

	return tags;
}
