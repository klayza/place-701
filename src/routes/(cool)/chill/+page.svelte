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

	let images = [
		'https://w.wallhaven.cc/full/ex/wallhaven-ex136k.jpg',
		'https://w.wallhaven.cc/full/l8/wallhaven-l8vp7y.jpg',
		'https://w.wallhaven.cc/full/nr/wallhaven-nr9m3w.jpg'
	];

	shuffle(images);
	shuffle(quotes);

	let imageIndex = 0
	let image = images[imageIndex];
	let playing = false;
	let currentQuoteIndex = 0;
	let audio = null;

	onMount(() => {
		try {
			audio = new Audio('/sounds/C418 - Clark.mp3');
			// startLoop(); // DISABLED currently
		} catch {
			console.log("Error in mount")
		}
	});

	function startLoop() {
		setTimeout(() => {
			showQuote();
			startLoop();
		}, 20000);
	}

	function toggleMusic() {
		if (!playing) {
			audio.play();
			console.log('Playing...');
			playing = true;
		} else {
			audio.pause();
			console.log('Paused...');
			playing = false;
		}
	}

	function showNextBackground() {
		let element = document.querySelector(".main-bg");
		imageIndex = imageIndex == images.length - 1 ? 0 : imageIndex + 1;
			console.log('dawdawdawd...');
		// element.style.background = `url('${images[imageIndex]}')`;
		image = images[imageIndex]
	}

	function shuffle(array) {
		let currentIndex = array.length;
		while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
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
	class="main-bg h-screen w-screen bg-cover bg-center flex justify-center items-center overscroll-x-none overscroll-y-none max-w-full max-h-full"
	style="background-image: url('{image}');"
>
	<p
		id="quote"
		class="text-6xl text-white text-center p-3"
		style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"
	></p>
</div>

<div
	class="controls bg-black bg-opacity-15 border-opacity-20 top-0 left-0 border-black border-2 flex absolute h-11 w-full p-2 gap-8"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="text-white cursor-pointer"><a href="/"><i class="bx bx-arrow-back ml-4 mr-6 text-lg text-red-500"></i></a></div>
	<div class="text-white cursor-pointer" on:click={() => toggleMusic()}>
		{playing ? 'Stop music' : 'Play music'}
	</div>
	<div class="text-white cursor-pointer" on:click={() => showNextBackground()}>Change background</div>
</div>

<style>
	#quote {
		font-family: Ultra;
		transition: opacity 2s;
	}
</style>
