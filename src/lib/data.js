let thoughts = {
    'next-discovery': {
        title: 'Next Discovery',
        snippet: 'What will be our next biggest discovery?',
        tags: ['thought experiment', 'existentialism', 'fundamentalism'],
        date: '3/12/2024',
    }
}

export function getThought(id) {
    return thoughts[id]
}