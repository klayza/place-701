import path from 'node:path';
import { loadConfig, parseCliOptions } from './config.js';
import { exportMarkdown, toExportedPost, writeIndexes } from './exportData.js';
import { commitAndPush } from './git.js';
import { loadManifest, saveManifest } from './manifest.js';
import { normalizeNote } from './normalizeNote.js';
import { ProgressBar } from './progress.js';
import { stringifyMarkdown } from './parseMarkdown.js';
import { findImageRefs, isLocalImageReference, resolveImagePath } from './resolveImages.js';
import { rewriteFrontmatterImages, rewriteMarkdownImages, assertCleanOutput } from './rewriteMarkdown.js';
import { scanVault } from './scanVault.js';
import { ImageRef, ImageReplacement, MediaIndexItem, ParsedNote } from './types.js';
import { uploadImageIfNeeded } from './uploadToR2.js';
import { assertUniqueSlugs, validateNote } from './validate.js';

type Summary = {
	foundNotes: number;
	publishedNotes: number;
	draftsSkipped: number;
	imagesFound: number;
	newUploads: number;
	reusedUploads: number;
	sourceBytes: number;
	outputBytes: number;
	exported: string[];
};

function printHeader(config: ReturnType<typeof loadConfig>): void {
	console.log('place-701 publisher');
	console.log('');
	console.log(`vault: ${config.vaultDir}`);
	console.log(`content: ${config.contentDir}`);
	console.log(`data repo: ${config.dataRepo}`);
	if (config.dryRun) console.log('mode: dry run');
	if (config.check) console.log('mode: check');
	if (config.skipOptimize) console.log('optimization: skipped');
	if (config.preview) console.log(`previews: ${config.previewDir}`);
	console.log('');
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

function coverImageRef(note: ParsedNote): ImageRef | null {
	const cover = note.frontmatter.cover;
	if (!isLocalImageReference(cover)) return null;

	return {
		raw: String(cover),
		kind: 'markdown',
		mediaType: 'image',
		target: String(cover),
		alt: path.basename(String(cover), path.extname(String(cover))),
		start: -1,
		end: -1
	};
}

async function main() {
	const options = parseCliOptions();
	const config = loadConfig(options);
	const manifest = await loadManifest(config);
	const summary: Summary = {
		foundNotes: 0,
		publishedNotes: 0,
		draftsSkipped: 0,
		imagesFound: 0,
		newUploads: 0,
		reusedUploads: 0,
		sourceBytes: 0,
		outputBytes: 0,
		exported: []
	};

	printHeader(config);

	console.log('scanning notes...');
	const notes = (await scanVault(config)).map(normalizeNote);
	const publishedNotes = config.requirePublishedFlag ? notes.filter((note) => note.frontmatter.published === true) : notes.filter((note) => note.frontmatter.published !== false);
	summary.foundNotes = notes.length;
	summary.publishedNotes = publishedNotes.length;
	summary.draftsSkipped = notes.length - publishedNotes.length;

	assertUniqueSlugs(publishedNotes);

	const exportedPosts = [];
	const mediaIndex: MediaIndexItem[] = [];
	const validationErrors: string[] = [];
	const noteProgress = new ProgressBar('publishing', publishedNotes.length);
	const stats = { previewsWritten: 0 };

	for (const [noteIndex, note] of publishedNotes.entries()) {
		noteProgress.update(noteIndex, note.relativePath);
		const noteErrors = validateNote(note);
		if (noteErrors.length > 0) {
			validationErrors.push(`${note.relativePath}\n${noteErrors.map((error) => `  - ${error}`).join('\n')}`);
			continue;
		}

		const bodyImageRefs = findImageRefs(note.body);
		const refs = [...bodyImageRefs];
		const coverRef = coverImageRef(note);
		if (coverRef) refs.push(coverRef);
		summary.imagesFound += refs.length;

		const replacements: ImageReplacement[] = [];

		for (const [imageIndex, imageRef] of refs.entries()) {
			noteProgress.update(noteIndex, `${note.relativePath} media ${imageIndex + 1}/${refs.length}: ${path.basename(imageRef.target)}`);
			const sourcePath = await resolveImagePath(config, note, imageRef);
			const { uploaded, reused, uploadedNow } = await uploadImageIfNeeded(config, manifest, note, sourcePath, stats);
			if (reused) summary.reusedUploads += 1;
			if (uploadedNow) summary.newUploads += 1;
			summary.sourceBytes += uploaded.sourceSize ?? 0;
			summary.outputBytes += uploaded.outputSize ?? 0;
			replacements.push({ imageRef, sourcePath, uploaded });
			mediaIndex.push({
				slug: String(note.frontmatter.slug),
				url: uploaded.url,
				source: path.basename(sourcePath)
			});
		}

		const body = rewriteMarkdownImages(
			note.body,
			replacements.filter((replacement) => replacement.imageRef.start >= 0)
		);
		const frontmatter = rewriteFrontmatterImages(note.frontmatter, replacements);
		assertCleanOutput(stringifyMarkdown(frontmatter, body));

		const exported = await exportMarkdown(config, note, frontmatter, body);
		summary.exported.push(exported.relativePath);
		exportedPosts.push(toExportedPost(frontmatter, exported.relativePath));
		noteProgress.update(noteIndex + 1, note.relativePath);
	}

	if (validationErrors.length > 0) {
		throw new Error(`Invalid published notes:\n\n${validationErrors.join('\n\n')}`);
	}

	console.log('writing indexes...');
	await writeIndexes(config, exportedPosts, mediaIndex);
	console.log('saving manifest...');
	await saveManifest(config, manifest);
	console.log('checking git...');
	const gitResult = await commitAndPush(config);

	console.log(`found notes: ${summary.foundNotes}`);
	console.log(`published: ${summary.publishedNotes}`);
	console.log(`drafts skipped: ${summary.draftsSkipped}`);
	console.log('');
	console.log(`images found: ${summary.imagesFound}`);
	console.log(`new uploads: ${summary.newUploads}`);
	console.log(`reused from manifest: ${summary.reusedUploads}`);
	if (summary.sourceBytes > 0) {
		const savedBytes = summary.sourceBytes - summary.outputBytes;
		const savedPercent = Math.round((savedBytes / summary.sourceBytes) * 100);
		console.log(`source media size: ${formatBytes(summary.sourceBytes)}`);
		console.log(`output media size: ${formatBytes(summary.outputBytes)}`);
		console.log(`estimated savings: ${formatBytes(savedBytes)} (${savedPercent}%)`);
	}
	if (config.preview) console.log(`preview files: ${stats.previewsWritten}/${config.previewLimit} in ${config.previewDir}`);
	console.log('');
	console.log('exported:');
	if (summary.exported.length === 0) console.log('  none');
	for (const file of summary.exported) console.log(`  ${file}`);
	console.log('');
	console.log(`git: ${gitResult}`);

	if (config.dryRun) {
		console.log('');
		console.log('dry run only');
		console.log('no files written');
		console.log('no images uploaded');
		console.log('no git commit made');
	}
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
