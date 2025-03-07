/** @type {import('./$types').PageLoad} */
export async function load() {
    const books = (await import('$lib/data/books.json')).default;
    return {
        books
    };
};