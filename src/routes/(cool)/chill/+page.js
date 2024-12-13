export function load() {
    let images = [
		'https://w.wallhaven.cc/full/ex/wallhaven-ex136k.jpg',
		'https://w.wallhaven.cc/full/l8/wallhaven-l8vp7y.jpg',
		'https://w.wallhaven.cc/full/nr/wallhaven-nr9m3w.jpg'
	];
	shuffle(images);


    return {};
};


function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}
