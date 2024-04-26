<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';

	let quotes = [
		'What if the darkness is just a shadow of the light?',
		'Maybe the only way out is through.',
		'The only constant is the unknown.',
		'What lies beyond the edge of sanity?',
		'In the silence, I find my voice.',
		'The darkness whispers secrets to the wind.',
		'Perhaps the truth is hidden in plain sight.',
		'The line between reality and madness is thin.',
		'What if the only truth is that there is no truth?',
		'The shadows dance upon the wall.',
		'In the depths of despair, I find my strength.',
		'The only way to escape is to surrender.',
		'The darkness is not the absence of light, but its own entity.',
		'What lies beyond the veil of reality?',
		'The unknown is not something to be feared, but embraced.',
		'The only constant is the uncertainty.',
		'Perhaps the only way to find oneself is to get lost.',
		'The silence is not empty, but full of whispers.',
		'What if the only way to move forward is to go back?',
		'The darkness is not the opposite of light, but its counterpart.',
		'Ever wonder what would happen if you let go?',
		"In the end it's all going to be ok."
	];

	shuffle(quotes);

	let images = [
		'https://w.wallhaven.cc/full/ex/wallhaven-ex136k.jpg',
		'https://w.wallhaven.cc/full/l8/wallhaven-l8vp7y.jpg',
		'https://w.wallhaven.cc/full/nr/wallhaven-nr9m3w.jpg'
	];

	let image = images[2];

	let currentQuoteIndex = 0;

	onMount(async () => {
		try {
			startLoop();
		} catch {}
	});

	function startLoop() {
		setTimeout(() => {
			showQuote();
			startLoop();
		}, 20000);
	}

	function playMusic() {
        console.log("Playing...")
		const audio = new Audio('/sounds/C418 - Clark.mp3');
		audio.play();
	}

    
	function shuffle(array) {
		let currentIndex = array.length;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
	}

	function showQuote() {
		const quoteElement = document.getElementById('quote');
		quoteElement.style.opacity = 0;
		quoteElement.textContent = quotes[currentQuoteIndex];
		currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

		setTimeout(() => {
			quoteElement.style.transition = 'opacity 2s';
			quoteElement.style.opacity = 1;
		}, 100);

		setTimeout(() => {
			quoteElement.style.transition = 'opacity 2s';
			quoteElement.style.opacity = 0;
		}, 15000);
	}
</script>

<div
	class="h-screen w-screen bg-cover bg-center flex justify-center items-center"
	style="background-image: url('{image}'); "
>
	<p
		id="quote"
		class="text-6xl text-white text-center p-3"
		style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"
	></p>
	<div
		class="controls z-10 bg-gradient-to-b from-gray-500 to-black flex absolute bottom-0 left-0 h-4 w-full p-2 gap-8"
	>
		<div class="text-white cursor-pointer" on:click={playMusic()} >Play audio</div>
		<div class="text-white cursor-pointer">Change background</div>
	</div>
</div>

<style>
	#quote {
		font-family: Ultra;
		transition: opacity 2s;
	}
</style>
