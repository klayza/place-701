import path from 'node:path';
import { ImageReplacement, NoteFrontmatter } from './types.js';
import { stripExtension } from './utils.js';

export function rewriteMarkdownImages(body: string, replacements: ImageReplacement[]): string {
	let output = body;
	const sorted = [...replacements].sort((a, b) => b.imageRef.start - a.imageRef.start);

	for (const replacement of sorted) {
		const alt = replacement.imageRef.alt || stripExtension(replacement.uploaded.originalFilename);
		const markup = mediaMarkup(replacement.uploaded.url, alt, replacement.uploaded.mediaType);
		output = `${output.slice(0, replacement.imageRef.start)}${markup}${output.slice(replacement.imageRef.end)}`;
	}

	for (const replacement of replacements) {
		if (!output.includes(replacement.imageRef.raw)) continue;
		const alt = replacement.imageRef.alt || stripExtension(replacement.uploaded.originalFilename);
		const markup = mediaMarkup(replacement.uploaded.url, alt, replacement.uploaded.mediaType);
		output = output.split(replacement.imageRef.raw).join(markup);
	}

	return output;
}

function mediaMarkup(url: string, alt: string, mediaType: 'image' | 'video'): string {
	if (mediaType === 'video') {
		return `<video src="${url}" controls playsinline preload="metadata"></video>`;
	}

	return `![${alt}](${url})`;
}

export function rewriteFrontmatterImages(frontmatter: NoteFrontmatter, replacements: ImageReplacement[]): NoteFrontmatter {
	const cover = frontmatter.cover;
	if (!cover || /^https?:\/\//i.test(cover)) return { ...frontmatter };

	const normalizedCover = path.basename(cover);
	const match = replacements.find((replacement) => path.basename(replacement.sourcePath) === normalizedCover || replacement.imageRef.target === cover);

	return {
		...frontmatter,
		cover: match?.uploaded.url ?? cover
	};
}

export function assertCleanOutput(markdown: string): void {
	const remainingEmbeds = markdown.match(/!\[\[[^\]]+\]\]/g) ?? [];
	if (remainingEmbeds.length > 0) {
		throw new Error(`export still contains Obsidian image embeds: ${remainingEmbeds.slice(0, 5).join(', ')}`);
	}

	if (/!\[[^\]]*\]\((?:\/home\/|~\/|[A-Za-z]:\\)/.test(markdown)) {
		throw new Error('export contains a local absolute image path');
	}
}
