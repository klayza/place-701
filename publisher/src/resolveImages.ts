import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { ImageRef, ParsedNote, PublisherConfig } from './types.js';
import { stripExtension } from './utils.js';

const OBSIDIAN_IMAGE_RE = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const IMAGE_EXT_RE = /\.(avif|gif|jpe?g|png|svg|webp)$/i;
const VIDEO_EXT_RE = /\.(m4v|mov|mp4|webm)$/i;
const MEDIA_EXT_RE = /\.(avif|gif|jpe?g|m4v|mov|mp4|png|svg|webm|webp)$/i;

export function findImageRefs(body: string): ImageRef[] {
	const refs: ImageRef[] = [];

	for (const match of body.matchAll(OBSIDIAN_IMAGE_RE)) {
		const target = match[1].trim();
		if (!MEDIA_EXT_RE.test(target)) continue;
		refs.push({
			raw: match[0],
			kind: 'obsidian',
			mediaType: mediaTypeFor(target),
			target,
			alt: stripExtension(target),
			width: match[2]?.trim(),
			start: match.index ?? 0,
			end: (match.index ?? 0) + match[0].length
		});
	}

	for (const match of body.matchAll(MARKDOWN_IMAGE_RE)) {
		const target = decodeURI(match[2].trim());
		if (/^https?:\/\//i.test(target)) continue;
		if (!MEDIA_EXT_RE.test(target.split('?')[0])) continue;
		refs.push({
			raw: match[0],
			kind: 'markdown',
			mediaType: mediaTypeFor(target),
			target,
			alt: match[1].trim() || stripExtension(target),
			start: match.index ?? 0,
			end: (match.index ?? 0) + match[0].length
		});
	}

	return refs.sort((a, b) => a.start - b.start);
}

export async function resolveImagePath(config: PublisherConfig, note: ParsedNote, imageRef: ImageRef): Promise<string> {
	const cleanTarget = imageRef.target.split('#')[0].split('?')[0];
	const noteDir = path.dirname(note.sourcePath);
	const candidates = [path.resolve(noteDir, cleanTarget), path.resolve(noteDir, 'attachments', cleanTarget), path.resolve(noteDir, '_attachments', cleanTarget), path.resolve(config.contentRoot, cleanTarget), ...config.attachmentRoots.map((root) => path.resolve(root, cleanTarget))];

	for (const candidate of candidates) {
		try {
			const stat = await fs.stat(candidate);
			if (stat.isFile()) return candidate;
		} catch {
			// Try next candidate.
		}
	}

	const found = await findByBasename(config, path.basename(cleanTarget));
	if (found.length === 1) return found[0];
	if (found.length > 1) {
		throw new Error([`ambiguous image in ${note.relativePath}`, `Could not choose one match for: ${imageRef.raw}`, 'Matched:', ...found.map((candidate) => `  ${candidate}`)].join('\n'));
	}

	throw new Error([`missing image in ${note.relativePath}`, `Could not resolve: ${imageRef.raw}`, 'Checked:', ...candidates.map((candidate) => `  ${candidate}`)].join('\n'));
}

async function findByBasename(config: PublisherConfig, basename: string): Promise<string[]> {
	const matches = await fg(`**/${basename}`, {
		cwd: config.contentRoot,
		absolute: true,
		onlyFiles: true,
		caseSensitiveMatch: false,
		ignore: ['**/.git/**']
	});

	return matches.filter((match) => /(^|[/\\])_?attachments?([/\\]|$)/i.test(match));
}

export function isLocalImageReference(value: string | undefined): boolean {
	if (!value) return false;
	if (/^https?:\/\//i.test(value)) return false;
	if (value.startsWith('/')) return false;
	return IMAGE_EXT_RE.test(value.split('?')[0]);
}

function mediaTypeFor(target: string): 'image' | 'video' {
	return VIDEO_EXT_RE.test(target.split('?')[0]) ? 'video' : 'image';
}
