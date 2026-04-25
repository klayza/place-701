import path from 'node:path';
import dotenv from 'dotenv';
import { CliOptions, PublisherConfig } from './types.js';
import { normalizePath } from './utils.js';

export function parseCliOptions(argv = process.argv.slice(2)): CliOptions {
	const previewLimitArg = argv.find((arg) => arg.startsWith('--preview-limit='));
	return {
		dryRun: argv.includes('--dry-run'),
		check: argv.includes('--check'),
		skipOptimize: argv.includes('--skip-optimize'),
		reuseMedia: argv.includes('--reuse-media'),
		preview: argv.includes('--preview'),
		previewLimit: previewLimitArg ? Number(previewLimitArg.split('=')[1]) : 12
	};
}

function readBoolean(name: string, fallback: boolean): boolean {
	const value = process.env[name];
	if (value === undefined) return fallback;
	return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function readNumber(name: string, fallback: number): number {
	const value = process.env[name];
	if (!value) return fallback;
	const parsed = Number(value);
	if (!Number.isFinite(parsed)) throw new Error(`${name} must be a number`);
	return parsed;
}

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`Missing required env var: ${name}`);
	return value;
}

export function loadConfig(options: CliOptions): PublisherConfig {
	const rootDir = path.resolve(new URL('..', import.meta.url).pathname);
	dotenv.config({ path: path.join(rootDir, '.env') });

	const vaultDir = normalizePath(requireEnv('OBSIDIAN_VAULT'));
	const contentDir = process.env.OBSIDIAN_CONTENT_DIR ?? 'Website';
	const attachmentDir = process.env.OBSIDIAN_ATTACHMENT_DIR ?? '_attachments';
	const attachmentRoots = (process.env.OBSIDIAN_ATTACHMENT_DIRS ?? attachmentDir)
		.split(',')
		.map((dir) => dir.trim())
		.filter(Boolean)
		.map((dir) => path.resolve(vaultDir, dir));
	const outputDir = normalizePath(process.env.OUTPUT_DIR ?? path.resolve(rootDir, '..', 'static', 'data'));

	const needsR2 = !options.dryRun && !options.check && !options.reuseMedia;

	return {
		rootDir,
		vaultDir,
		contentDir,
		contentRoot: path.join(vaultDir, contentDir),
		attachmentDir,
		attachmentRoot: path.join(vaultDir, attachmentDir),
		attachmentRoots,
		outputDir,
		r2AccountId: needsR2 ? requireEnv('R2_ACCOUNT_ID') : process.env.R2_ACCOUNT_ID ?? '',
		r2AccessKeyId: needsR2 ? requireEnv('R2_ACCESS_KEY_ID') : process.env.R2_ACCESS_KEY_ID ?? '',
		r2SecretAccessKey: needsR2 ? requireEnv('R2_SECRET_ACCESS_KEY') : process.env.R2_SECRET_ACCESS_KEY ?? '',
		r2Bucket: needsR2 ? requireEnv('R2_BUCKET') : process.env.R2_BUCKET ?? '',
		publicMediaUrl: requireEnv('PUBLIC_MEDIA_URL').replace(/\/$/, ''),
		outputImageFormat: 'webp',
		outputImageQuality: readNumber('OUTPUT_IMAGE_QUALITY', 82),
		maxImageWidth: readNumber('MAX_IMAGE_WIDTH', 1800),
		requirePublishedFlag: readBoolean('PUBLISH_REQUIRE_FLAG', true),
		skipOptimize: options.skipOptimize,
		reuseMedia: options.reuseMedia,
		preview: options.preview,
		previewLimit: options.previewLimit,
		previewDir: path.join(rootDir, 'previews'),
		dryRun: options.dryRun,
		check: options.check
	};
}
