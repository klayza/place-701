export class ProgressBar {
	private lastLength = 0;
	private lastLogAt = 0;
	private readonly startedAt = Date.now();
	private readonly interactive = Boolean(process.stdout.isTTY);

	constructor(
		private readonly label: string,
		private readonly total: number
	) {}

	update(current: number, detail = ''): void {
		if (this.total === 0) return;

		const now = Date.now();
		if (!this.interactive && current !== this.total && now - this.lastLogAt < 5000) return;

		const percent = Math.round((current / this.total) * 100);
		const width = 24;
		const filled = Math.round((current / this.total) * width);
		const bar = `${'#'.repeat(filled)}${'-'.repeat(width - filled)}`;
		const elapsed = Math.round((now - this.startedAt) / 1000);
		const line = `${this.label} [${bar}] ${current}/${this.total} ${percent}% ${elapsed}s${detail ? ` - ${detail}` : ''}`;

		if (this.interactive) {
			const padding = this.lastLength > line.length ? ' '.repeat(this.lastLength - line.length) : '';
			process.stdout.write(`\r${line}${padding}`);
			this.lastLength = line.length;
			if (current === this.total) process.stdout.write('\n');
		} else {
			console.log(line);
		}

		this.lastLogAt = now;
	}
}
