import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { PublisherConfig } from './types.js';

const execFileAsync = promisify(execFile);

async function git(config: PublisherConfig, args: string[]): Promise<string> {
	const { stdout } = await execFileAsync('git', args, { cwd: config.dataRepo });
	return stdout.trim();
}

export async function commitAndPush(config: PublisherConfig): Promise<'clean' | 'committed' | 'pushed' | 'skipped'> {
	if (config.dryRun || config.check || !config.autoCommit) return 'skipped';

	const status = await git(config, ['status', '--short']);
	if (!status) return 'clean';

	await git(config, ['add', '.']);
	await git(config, ['commit', '-m', 'publish content updates']);

	if (config.autoPush) {
		await git(config, ['push']);
		return 'pushed';
	}

	return 'committed';
}
