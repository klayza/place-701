import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Manifest, ParsedNote, PublisherConfig, PublishStats, UploadedImage } from './types.js';
import { pluralType, sha256 } from './utils.js';

type OptimizedImage = {
	buffer: Buffer;
	ext: string;
	contentType: string;
	mediaType: 'image' | 'video';
};

const VIDEO_CONTENT_TYPES: Record<string, string> = {
	'.m4v': 'video/x-m4v',
	'.mov': 'video/quicktime',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm'
};

function createClient(config: PublisherConfig): S3Client {
	return new S3Client({
		region: 'auto',
		endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: config.r2AccessKeyId,
			secretAccessKey: config.r2SecretAccessKey
		}
	});
}

async function optimizeImage(config: PublisherConfig, sourcePath: string): Promise<OptimizedImage> {
	const ext = path.extname(sourcePath).toLowerCase();
	const input = await fs.readFile(sourcePath);
	const videoContentType = VIDEO_CONTENT_TYPES[ext];
	if (videoContentType) {
		return {
			buffer: input,
			ext: ext.slice(1),
			contentType: videoContentType,
			mediaType: 'video'
		};
	}

	if (config.skipOptimize) {
		return {
			buffer: input,
			ext: ext.replace('.', '') || 'bin',
			contentType: contentTypeForImageExt(ext),
			mediaType: 'image'
		};
	}

	const image = sharp(input, { animated: false }).rotate();
	const metadata = await image.metadata();
	const width = metadata.width && metadata.width > config.maxImageWidth ? config.maxImageWidth : undefined;

	const buffer = await image.resize({ width, withoutEnlargement: true }).webp({ quality: config.outputImageQuality }).toBuffer();

	return {
		buffer,
		ext: 'webp',
		contentType: 'image/webp',
		mediaType: 'image'
	};
}

function contentTypeForImageExt(ext: string): string {
	switch (ext) {
		case '.avif':
			return 'image/avif';
		case '.gif':
			return 'image/gif';
		case '.jpg':
		case '.jpeg':
			return 'image/jpeg';
		case '.png':
			return 'image/png';
		case '.svg':
			return 'image/svg+xml';
		case '.webp':
			return 'image/webp';
		default:
			return 'application/octet-stream';
	}
}

async function objectExists(client: S3Client, config: PublisherConfig, key: string): Promise<boolean> {
	try {
		await client.send(new HeadObjectCommand({ Bucket: config.r2Bucket, Key: key }));
		return true;
	} catch (error) {
		const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
		if (status === 404) return false;
		throw error;
	}
}

export async function uploadImageIfNeeded(config: PublisherConfig, manifest: Manifest, note: ParsedNote, sourcePath: string, stats?: PublishStats): Promise<{ uploaded: UploadedImage; reused: boolean; uploadedNow: boolean }> {
	if (config.reuseMedia) {
		return {
			uploaded: reuseUploadedMedia(config, manifest, sourcePath),
			reused: true,
			uploadedNow: false
		};
	}

	const optimized = await optimizeImage(config, sourcePath);
	const hash = sha256(optimized.buffer);
	const shortHash = hash.slice(0, 12);
	const typeDir = pluralType(String(note.frontmatter.type));
	const key = `${typeDir}/${note.frontmatter.slug}/${shortHash}.${optimized.ext}`;
	const url = `${config.publicMediaUrl}/${key}`;
	const existing = manifest[`sha256:${hash}`];
	const sourceSize = (await fs.stat(sourcePath)).size;

	if (existing) {
		existing.sourceSize ??= sourceSize;
		existing.outputSize ??= optimized.buffer.length;
		return { uploaded: existing, reused: true, uploadedNow: false };
	}

	const uploaded: UploadedImage = {
		hash,
		sourcePath,
		originalFilename: path.basename(sourcePath),
		r2Key: key,
		url,
		format: optimized.ext,
		contentType: optimized.contentType,
		mediaType: optimized.mediaType,
		uploadedAt: new Date().toISOString(),
		sourceSize,
		outputSize: optimized.buffer.length
	};

	if (config.preview && optimized.mediaType === 'image' && stats && stats.previewsWritten < config.previewLimit) {
		uploaded.previewPath = await writePreview(config, note, sourcePath, optimized.buffer, optimized.ext);
		stats.previewsWritten += 1;
	}

	if (!config.dryRun && !config.check) {
		const client = createClient(config);
		if (!(await objectExists(client, config, key))) {
			await client.send(
				new PutObjectCommand({
					Bucket: config.r2Bucket,
					Key: key,
					Body: optimized.buffer,
					ContentType: optimized.contentType
				})
			);
		}
		manifest[`sha256:${hash}`] = uploaded;
	}

	return { uploaded, reused: false, uploadedNow: true };
}

function reuseUploadedMedia(config: PublisherConfig, manifest: Manifest, sourcePath: string): UploadedImage {
	const matches = Object.values(manifest).filter((entry) => entry.sourcePath === sourcePath);
	if (matches.length === 0) {
		throw new Error(`No uploaded media manifest entry found for ${sourcePath}`);
	}

	const uploaded = { ...matches[0] };
	uploaded.url = `${config.publicMediaUrl}/${uploaded.r2Key}`;
	manifest[`sha256:${uploaded.hash}`] = uploaded;
	return uploaded;
}

async function writePreview(config: PublisherConfig, note: ParsedNote, sourcePath: string, buffer: Buffer, ext: string): Promise<string> {
	const typeDir = pluralType(String(note.frontmatter.type));
	const outputDir = path.join(config.previewDir, typeDir, String(note.frontmatter.slug));
	const basename = `${path.basename(sourcePath, path.extname(sourcePath))}.${ext}`;
	const outputPath = path.join(outputDir, basename);
	await fs.mkdir(outputDir, { recursive: true });
	await fs.writeFile(outputPath, buffer);
	return outputPath;
}
