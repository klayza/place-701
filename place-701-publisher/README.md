# place-701 publisher

Local Obsidian-to-website publishing pipeline for `place-701`.

```bash
cd place-701-publisher
npm install
cp .env.example .env
npm run publish:dry
npm run publish:fast
npm run publish:preview
npm run publish
```

The publisher scans `OBSIDIAN_VAULT/OBSIDIAN_CONTENT_DIR`, exports only notes with `published: true`, uploads local markdown images to Cloudflare R2, rewrites markdown to public media URLs, writes clean markdown and indexes to `DATA_REPO`, then optionally commits and pushes that data repo.

Use `publish:fast` when you only want to validate notes and media paths without converting images. Use `publish:preview` to write a small sample of optimized images to `previews/` and print estimated storage savings.
