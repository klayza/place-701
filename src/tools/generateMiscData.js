import fs from 'fs';
import path from 'path';

function parseTodoMd(content) {
	const todoRegex = /^(\d+)\.\s*\[(x| )\]\s*(.+)$/;
	const linkRegex = /\[(.+?)\]\((.+?)\)/;

	return content
		.split('\n')
		.map((line) => {
			line = line.trim();
			if (!line) return null;

			const todoMatch = line.match(todoRegex);
			if (!todoMatch) return null;

			const [_, number, checkmark, remainder] = todoMatch;

			// Check if the remainder contains a link
			const linkMatch = remainder.match(linkRegex);

			return {
				id: parseInt(number),
				done: checkmark === 'x',
				text: linkMatch ? linkMatch[1] : remainder,
				...(linkMatch && { url: linkMatch[2] })
			};
		})
		.filter(Boolean);
}

function parseLinksTable(content) {
	const lines = content.split('\n').filter((line) => {
		// Skip empty lines, separator lines, header line, and lines between --- markers
		return line.trim() && !line.includes('---') && !line.includes('| Title') && !line.startsWith('cssclasses:');
	});

	return lines
		.map((line) => {
			const [title, url, description, category] = line
				.split('|')
				.slice(1, -1)
				.map((cell) => cell.trim());

			if (!title || !url) return null;

			const entry = {
				title,
				url
			};
			if (description) entry.description = description;
			if (category) entry.category = category;
			return entry;
		})
		.filter(Boolean);
}

function parseBooksTable(content) {
	const lines = content.split('\n').filter((line) => line.trim() && !line.includes('---') && !line.includes('| Name') && !line.startsWith('cssclasses:'));

	return lines
		.map((line) => {
			const [name, author, start, end, comment, isbn, img] = line
				.split('|')
				.slice(1, -1)
				.map((cell) => cell.trim());

			// Only create entry if we have at least a name
			if (!name) return null;

			// Extract image URL from markdown image syntax if present
			const imgUrlMatch = img && img.match(/\[.*?\]\((.*?)\)/);
			const imageUrl = imgUrlMatch ? imgUrlMatch[1] : '';

			return {
				name,
				author,
				start: start || null,
				end: end || null,
				comment,
				isbn,
				img: imageUrl
			};
		})
		.filter(Boolean); // Remove any null entries
}

async function main() {
	const todoContent = await fs.promises.readFile(path.join(process.cwd(), 'static/data/todo.md'), 'utf-8');
	const linksContent = await fs.promises.readFile(path.join(process.cwd(), 'static/data/links.md'), 'utf-8');
	const booksContent = await fs.promises.readFile(path.join(process.cwd(), 'static/data/books.md'), 'utf-8');

	const todoJson = parseTodoMd(todoContent);
	const linksJson = parseLinksTable(linksContent);
	const booksJson = parseBooksTable(booksContent);

	await fs.promises.writeFile(path.join(process.cwd(), 'src/lib/data/todo.json'), JSON.stringify(todoJson, null, 2));
	await fs.promises.writeFile(path.join(process.cwd(), 'src/lib/data/links.json'), JSON.stringify(linksJson, null, 2));
	await fs.promises.writeFile(path.join(process.cwd(), 'src/lib/data/books.json'), JSON.stringify(booksJson, null, 2));
}

main().catch(console.error);
