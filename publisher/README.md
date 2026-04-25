# place-701 publisher

Local Obsidian-to-website publishing pipeline for `place-701`.

```bash
cd publisher
npm install
cp .env.example .env
npm run publish:dry
npm run publish:fast
npm run publish:preview
npm run publish:reexport
npm run publish
```

The publisher scans `OBSIDIAN_VAULT/OBSIDIAN_CONTENT_DIR`, uploads local markdown media to Cloudflare R2, rewrites markdown to public media URLs, then writes clean markdown and indexes to `OUTPUT_DIR`. The default one-repo setup writes directly to `place-701/static/data`; commit and push the main `place-701` repo normally after publishing.

Use `publish:fast` when you only want to validate notes and media paths without converting images. Use `publish:preview` to write a small sample of optimized images to `previews/` and print estimated storage savings.

Use `publish:reexport` after changing `PUBLIC_MEDIA_URL` when the media is already uploaded. It rewrites/export markdown from Obsidian using existing manifest entries and skips upload, image optimization, and hashing.
