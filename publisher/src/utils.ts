import crypto from 'node:crypto';
import path from 'node:path';
import slugify from 'slugify';

export function normalizePath(input: string): string {
	return path.resolve(input.replace(/^~/, process.env.HOME ?? '~'));
}

export function toPosixPath(input: string): string {
	return input.split(path.sep).join('/');
}

export function sha256(buffer: Buffer): string {
	return crypto.createHash('sha256').update(buffer).digest('hex');
}

export function stripExtension(filename: string): string {
	return path.basename(filename, path.extname(filename));
}

export function normalizeSlug(value: string): string {
	return slugify(value, { lower: true, strict: true });
}

export function ensureArray(value: unknown): string[] {
	if (!value) return [];
	if (Array.isArray(value)) return value.map(String).filter(Boolean);
	return [String(value)].filter(Boolean);
}

export function formatDate(value: string | Date | undefined): string {
	if (!value) return '';
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return String(value);
}

export function pluralType(type: string): string {
	if (type.endsWith('s')) return type;
	return `${type}s`;
}
