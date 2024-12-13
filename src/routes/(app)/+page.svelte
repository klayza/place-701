<script>
	import { onMount } from 'svelte';
	import { trips, trip_data, books } from '$lib/data.js';

	const dob = new Date('11/26/2003');
	let age_years;
	let selected_photo;
	let selected_location;

	let places = [
		{ name: 'travel', description: "See where I've been." },
		{ name: 'books', description: 'Some of my recommended reads.' },
		// { name: 'music', description: 'Listen to some bangers.' },
		// { name: 'chill', description: 'A chill splash screen with music.' },
		{ name: 'projects', description: 'Work and play.' },
		{ name: 'thoughts', description: 'My opinions on the world.' },
		{ name: 'links', description: 'My favorite sites around the net.' },
		{ name: 'manifesto', description: 'Get a glimpse of the vision.', img: '/img/think.jpg', type: 'link' },
		{ name: 'todo', description: 'Things I must do before I die.', type: 'link' },
		{ name: 'recipes', description: 'Meals I make often.', type: 'link' }
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

<!-- <div class="container mx-auto px-4 sm:px-6 lg:px-8">
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
</div> -->

<div class="container mx-auto px-4 sm:px-6 lg:px-8">
	<div class=" p-4 max-w-2xl mx-auto">
		<h2 class="uppercase mb-4 mt-2 text-center">Who are you?</h2>
		<p class="mb-4 text-xl">I'm a software engineer, independent student, and entrepreneur. I live abroad and like making cool things on the internet. I write about AI, automation, philosophy, and improving life with software. <a href="/about" class="no-color hover:underline">Read more</a></p>
		<ul class="mt-24">
			{#each places.filter((place) => place.type != 'link') as place}
				<li class="mb-12">
					<h2 title={place.description} class="uppercase text-3xl mb-4 mt-2"><a href="/{place.name}" class=" no-color">{place.name}</a></h2>
					<hr />
					<div>
						{#if place.name == 'travel'}
							<div class="flex items-center justify-between mb-4">
								<span class="text-2xl hover:cursor-pointer">&lt;</span>
								<h2 class="uppercase mb-4 mt-2 text-center pt-3">
									<a href="/travel/west-coast-2024" class="no-color">Pacific West Coast</a> <span class="text-gray-400"> (1/3)</span>
								</h2>
								<span class="text-2xl hover:cursor-pointer">&gt;</span>
							</div>
							<div class="flex flex-wrap">
								{#each trip_data['west-coast-2024'] as location, index}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-missing-attribute -->
									<a
										id="location-{index + 1}"
										ref="/travel/west-coast-2024/w{index + 1}"
										class="no-color p-2 border m-1 rounded-sm hover:cursor-pointer {selected_location == location.id ? '' : 'border-dotted '}"
										on:click={() => {
											selected_photo = location.cover;
											selected_location = location.id;
										}}
									>
										{location.title}
									</a>
								{/each}
							</div>
							{#if selected_photo}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div class="relative p-4 border border-dotted m-1 rounded-sm hover:cursor-pointer group" on:click={() => (window.location.href = `/travel/west-coast-2024/w${selected_location}`)}>
									<img src={selected_photo} alt="preview" class="w-full h-64 object-cover" />
									<span class="absolute top-8 right-8 text-lg text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"> ↗ </span>
								</div>
							{/if}
						{/if}
						{#if place.name == 'books'}
							<!-- <div class="flex items-center space-x-4">
										<div class="w-8 text-right text-gray-500">
											<p>{index + 1}</p>
										</div>
										<a href="/travel/west-coast-2024/w{index + 1}" class="no-color">
											{location.title}
										</a>
									</div> -->
							{#each books as book}
								<div class="flex items-center space-x-4">
									<div class="w-16 text-right text-gray-400">
										<p>{book.start.split('/')[0] + '/' + book.start.split('/')[2]}</p>
									</div>
									<a href="/books/{book.id}" class="no-color">
										{book.name}
									</a>
									<div class=" text-right text-gray-400 line-clamp-1">
										<p>{book.author}</p>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				</li>
			{/each}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
				{#each places.filter((place) => place.type == 'link') as place}
					<a href="/{place.name}" class=" relative no-color static-link">
						<div class="relative border border-dotted mb-12 p-4 hover:cursor-pointer group">
							<h2 title={place.description} class="uppercase text-xl mb-4 mt-2"><a href="/{place.name}" class=" no-color">{place.name}</a></h2>
							<div>
								<p class="mb-4">{place.description}</p>
							</div>
							<span class="absolute top-3 right-3 text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"> ↗ </span>
						</div>
					</a>
				{/each}
			</div>
		</ul>
	</div>
	<!-- <a href="/about" class="btn-primary">Read More →</a> -->
</div>

<style>
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
