import path from 'node:path';
import { ParsedNote } from './types.js';
import { normalizeSlug, toPosixPath } from './utils.js';

export function normalizeNote(note: ParsedNote): ParsedNote {
	const pathParts = note.relativePath.split('/');
	const basename = path.basename(note.relativePath, '.md');
	const inferredType = pathParts.length > 1 ? singularize(pathParts[0] || 'note') : 'page';
	const inferredSlug = normalizeSlug(toPosixPath(note.relativePath).replace(/\.md$/, '').replace(/\//g, '-'));
	const inferredTitle = titleize(basename);

	return {
		...note,
		frontmatter: {
			...note.frontmatter,
			title: note.frontmatter.title ?? inferredTitle,
			slug: note.frontmatter.slug ?? inferredSlug,
			type: note.frontmatter.type ?? inferredType
		}
	};
}

function singularize(value: string): string {
	if (value.endsWith('ies')) return `${value.slice(0, -3)}y`;
	if (value.endsWith('s')) return value.slice(0, -1);
	return value;
}

function titleize(value: string): string {
	return value
		.replace(/[-_]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
