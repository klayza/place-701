export type CliOptions = {
	dryRun: boolean;
	check: boolean;
	skipOptimize: boolean;
	reuseMedia: boolean;
	preview: boolean;
	previewLimit: number;
};

export type PublisherConfig = {
	rootDir: string;
	vaultDir: string;
	contentDir: string;
	contentRoot: string;
	attachmentDir: string;
	attachmentRoot: string;
	attachmentRoots: string[];
	outputDir: string;
	r2AccountId: string;
	r2AccessKeyId: string;
	r2SecretAccessKey: string;
	r2Bucket: string;
	publicMediaUrl: string;
	outputImageFormat: 'webp';
	outputImageQuality: number;
	maxImageWidth: number;
	requirePublishedFlag: boolean;
	skipOptimize: boolean;
	reuseMedia: boolean;
	preview: boolean;
	previewLimit: number;
	previewDir: string;
	dryRun: boolean;
	check: boolean;
};

export type PublishStats = {
	previewsWritten: number;
};

export type NoteFrontmatter = {
	title?: string;
	slug?: string;
	date?: string | Date;
	updated?: string | Date;
	type?: string;
	published?: boolean;
	description?: string;
	tags?: string[];
	cover?: string;
	[key: string]: unknown;
};

export type ParsedNote = {
	sourcePath: string;
	relativePath: string;
	body: string;
	frontmatter: NoteFrontmatter;
};

export type ImageRef = {
	raw: string;
	kind: 'obsidian' | 'markdown';
	mediaType: 'image' | 'video';
	target: string;
	alt: string;
	width?: string;
	start: number;
	end: number;
};

export type UploadedImage = {
	hash: string;
	sourcePath: string;
	originalFilename: string;
	r2Key: string;
	url: string;
	format: string;
	contentType: string;
	mediaType: 'image' | 'video';
	uploadedAt: string;
	sourceSize?: number;
	outputSize?: number;
	previewPath?: string;
};

export type Manifest = Record<string, UploadedImage>;

export type ImageReplacement = {
	imageRef: ImageRef;
	sourcePath: string;
	uploaded: UploadedImage;
};

export type ExportedPost = {
	title: string;
	slug: string;
	type: string;
	date: string;
	updated?: string;
	description: string;
	tags: string[];
	path: string;
	cover: string | null;
};

export type MediaIndexItem = {
	slug: string;
	url: string;
	source: string;
};
