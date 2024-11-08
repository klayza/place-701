<script>
	import { onMount } from 'svelte';

	const dob = new Date('11/26/2003');
	let age_years;
	let intro = `I'm a software engineer, independent student, and entrepreneur. I live abroad and make cool
				things on the internet. I write about AI, automation, philosophy, and improving life with
				software.`;

	let places = [
		{ name: 'travel', description: "See where I've been." },
		{ name: 'books', description: 'Some of my recommended reads.' },
		// { name: 'music', description: 'Listen to some bangers.' },
		// { name: 'chill', description: 'A chill splash screen with music.' },
		{ name: 'projects', description: 'Work and play.' },
		{ name: 'thoughts', description: 'My opinions on the world.' },
		{ name: 'links', description: 'My favorite sites around the net.' },
		{ name: 'manifesto', description: 'Get a glimpse of the vision.', img: '/img/think.jpg' },
		// { name: 'recipes', description: 'Meals I make often.' },
	];

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function calculateAge(birthDate) {
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	onMount(() => {
		age_years = calculateAge(dob);
	});
</script>

<div class="container mx-auto px-4 sm:px -6 lg:px-8">
	<header class="py-16 sm:py-24">
		<h1 class="text-4xl sm:text-6xl font-bold mb-4">CLAYTON WIEBERG</h1>
		<p class="text-xl sm:text-2xl mb-8">{intro}</p>
		<a href="/about" class="btn-primary">Read More →</a>
	</header>

	<section class="mb-16">
		<h2 class="text-3xl sm:text-5xl font-bold mb-8">EXPLORE</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each places as place}
				<a href="/{place.name}" class="place-card">
					<img src={place.img ? place.img : 'img/' + place.name + '.png'} alt={place.name} class="w-full h-64 object-cover" />
					<div class="overlay">
						<h3 class="text-2xl font-bold mb-2">{capitalizeFirstLetter(place.name)}</h3>
						<p>{capitalizeFirstLetter(place.description)}</p>
						<span class="arrow">→</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="text-3xl sm:text-5xl font-bold mb-8">TOPICS</h2>
		<p class="text-2xl text-center">UNDER CONSTRUCTION</p>
	</section>
</div>

<style>
	:global(body) {
		background-color: #f0f0f0;
		color: #333;
		/* font-family: 'Arial', sans-serif; */
	}

	.container {
		max-width: 1200px;
	}

	h1,
	h2 {
		font-weight: 900;
		letter-spacing: 0.05em;
	}

	.btn-primary {
		display: inline-block;
		background-color: #000;
		color: #fff;
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
		font-weight: bold;
		text-transform: uppercase;
		transition:
			background-color 0.3s,
			transform 0.3s;
	}

	.btn-primary:hover {
		background-color: #333;
		transform: translateY(-2px);
	}

	.place-card {
		position: relative;
		overflow: hidden;
		border: 2px solid #000;
		transition: transform 0.3s;
	}

	.place-card:hover {
		transform: translateY(-5px);
	}

	.overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.8);
		color: #fff;
		padding: 1rem;
		transform: translateY(0%);
		/* transform: translateY(100%); */
		transition: transform 0.3s;
	}

	.place-card:hover .overlay {
		transform: translateY(0);
	}

	.arrow {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		font-size: 1.5rem;
		font-weight: bold;
	}

	@media (max-width: 640px) {
		.place-card .overlay {
			transform: translateY(0);
			background-color: rgba(0, 0, 0, 0.6);
		}
	}
</style>
