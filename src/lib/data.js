export let thoughts = [
    {
        id: 'next-discovery',
        title: 'Next Discovery',
        snippet: 'What will be our next biggest discovery?',
        tags: ['thought experiment', 'existentialism', 'fundamentalism'],
        date: '3/12/2024',
        content: "<span class='first-letter'>T</span><i>here is a person here is a personhere is a person here is a person here is a person here is a person here is a person</i>",
        img: "img/clouds.png"
    },
    {
        id: 'next-discovery',
        title: 'Next Discoveries',
        snippet: 'What will be our next biggest discovery?',
        date: '3/12/2024',
        tags: ['thought experiment', 'existentialism', 'fundamentalism'],
        img: 'img/next-discovery.png'
    },
    {
        id: 'next-discovery',
        title: 'Cars Politics',
        snippet:
            'Cars, the movie had to be one of the most existentially horiffic movies I have ever watched',
        date: '1/12/2024',
        tags: ['movie', 'existentialism', 'fundamentalism'],
        img: 'img/cars-politics.png'
    },
    {
        id: 'next-discovery',
        title: 'Homo Sapien History',
        snippet:
            'One of the most remarkable achievements I have witnessed is the realization and adoption of intelligent machines.',
        date: '3/12/2023',
        tags: ['rainbow', 'clayton', 'deez nutz', 'yoyoyoyoyoyoyoyoyoyoyo'],
        img: 'img/primitives.png'
    }

]

export function getThought(id) {
    return thoughts[id]
}