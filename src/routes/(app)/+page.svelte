<script>
	import { onMount } from 'svelte';

	let dob = new Date('11/26/2003');
	let age_years;
	let intro = `I'm a software engineer, informal student, and entrepreneur. I live abroad and make cool
				things on the internet. I write about AI, automation, philosophy, and improving life with
				software.`;

	let places = [
		{ name: 'travel', description: "See where I've been." },
		{ name: 'books', description: 'Some of my reccomended reads.' },
		{
			name: 'manifesto',
			description: 'Get a glimpse of the vision.',
			img: 'https://w.wallhaven.cc/full/p2/wallhaven-p2evlp.png'
		},
		{ name: 'music', description: 'Listen to some bangers.' },
		{ name: 'chill', description: 'A chill splash screen with music.' },
	];

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// Calculate age based on current date
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

<div class="intro inline-flex gap-20 z-5 relative pb-20 max-w-full sm:px-20">
	<div class="intro-left m-auto max-w-full">
		<h1 class="p-5 mt-10 sm:mt-24 mb-10 leading-none max-w-full text-2xl sm:text-6xl ">Welcome. This is the website of Clayton Wieberg.</h1>
		<div class="below-intro flex items-center justify-center flex-row gap-10 mt-10 px-8 sm:px-24">
			<div class="sm:basis-3/4 text-md sm:text-left sm:p-5 sm:text-3xl flex-grow">
				<p class="">
					{intro}
					<span class="text-center m-auto">Read more about me <a href="/about" class="italic">here</a></span>
				</p>
			</div>
			<div class="basis-1/4">
				<img src="/img/rasttoo.png" class="border hidden sm:block" alt="Boulder" />
				<!-- <p class="italic text-gray-800">
					If you recognize this image, then you are in the right place.
				</p> -->
			</div>
		</div>
	</div>
</div>

<div class="places px-5 sm:px-20 mb-20">
	<h1 class="text-2xl sm:text-5xl pb-2">Places</h1>
	<hr />
	<div class="places-grid flex flex-col sm:flex-row gap-2 sm:gap-8 my-4 sm:my-10 p-2 sm:p-10 overflow-x-hidden overflow-y-hidden">
		{#each places as place}
			<a href="/{place.name}" class="place-container overflow-hidden hover:border-red-600">
				<p class="text-lg sm:text-2xl w-full p-2 text-white bg-black">{capitalizeFirstLetter(place.name)}</p>
				<img src={place.img ? place.img : 'img/' + place.name + '.png'} alt={place.name} />
				<div class="description bg-black text-xl text-white p-4 px-12 opacity-100 sm:opacity-0">
					<p>{capitalizeFirstLetter(place.description)}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<div class="px-5 sm:px-20">
	<h1 class="text-2xl sm:text-5xl pb-2">Topics</h1>
	<hr />
	<p class="text-4xl m-8 text-center">UNDER CONSTRUCTION</p>
	<!-- <div class="flex flex-row gap-16 p-10">
		<div>
			<h2 class="text-2xl mb-4 border p-2">Artificial Intelligence</h2>
			<ul>
				<li style="list-style-type: square;">Robot evolution</li>
				<li>Nanobot existential risk worth it?</li>
			</ul>
		</div>
		<div>
			<h2 class="text-2xl mb-4 border p-2">Self-Improvement</h2>
			<ul>
				<li>Robot evolution</li>
				<li>Nanobot existential risk worth it?</li>
			</ul>
		</div>
	</div> -->
</div>

<!-- <style>
.place-item::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    pointer-events: none;
  }</style> -->

<style>
body {
	overflow-x: hidden;
}

	.place-container {
		position: relative;
		display: inline-block;
		text-decoration: none;
		overflow-y: hidden; 
		height: 512px; 
	}

	.place-container img {
		display: block;
		height: 512px; /* Maintain the image height */
		width: 512px; /* Allow the width to adjust automatically */
		min-width: 100%; 
		object-fit: cover; /* Ensure the image covers the space without distortion */
		object-position: center; /* Center the image within the element */
		transition: opacity 0.3s ease;
	}

	.place-container .name,
	.place-container .description {
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
		padding: 0.5rem 1rem;
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	.place-container .name {
		top: 0; /* Position the name at the top of the container */
		background-color: black;
		color: white;
	}

	.place-container .description {
		bottom: 0; /* Position the description at the bottom of the container */
		background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
		opacity: 0; /* Initially hidden */
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.place-container:hover img {
		opacity: 0.7; /* Dim the image on hover */
	}

	.place-container:hover .description {
		opacity: 1 !important; /* Show the description on hover */
	}
</style>
