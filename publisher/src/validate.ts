import { ParsedNote } from './types.js';
import { normalizeSlug } from './utils.js';

const REQUIRED_FIELDS = ['title', 'slug', 'type'] as const;

export function validateNote(note: ParsedNote): string[] {
	const errors: string[] = [];

	for (const field of REQUIRED_FIELDS) {
		if (!note.frontmatter[field]) errors.push(`missing frontmatter field "${field}"`);
	}

	if (note.frontmatter.slug && normalizeSlug(String(note.frontmatter.slug)) !== note.frontmatter.slug) {
		errors.push(`slug must be URL-safe: ${note.frontmatter.slug}`);
	}

	if (note.frontmatter.published !== undefined && typeof note.frontmatter.published !== 'boolean') {
		errors.push('published must be true or false');
	}

	// if (/\[\[[^\]]+\]\]/.test(note.body.replace(/!\[\[[^\]]+\]\]/g, ''))) {
	// 	errors.push('contains unresolved Obsidian wiki links');
	// }

	return errors;
}

export function assertUniqueSlugs(notes: ParsedNote[]): void {
	const seen = new Map<string, string>();
	const duplicates: string[] = [];

	for (const note of notes) {
		const slug = String(note.frontmatter.slug ?? '');
		if (!slug) continue;
		const existing = seen.get(slug);
		if (existing) duplicates.push(`${slug}: ${existing} and ${note.relativePath}`);
		seen.set(slug, note.relativePath);
	}

	if (duplicates.length > 0) {
		throw new Error(`Duplicate slugs found:\n${duplicates.map((item) => `  ${item}`).join('\n')}`);
	}
}
