<script>
	import Footer from '$lib/components/Footer.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { trips, trip_data, books } from '$lib/data.js';
	let containerHeight = 500;
	const dob = new Date('11/26/2003');
	let age_years;
	let selected_photo = trip_data['west-coast-2024'][0].cover;
	let selected_location = trip_data['west-coast-2024'][0].id;
	let selected_title = trip_data['west-coast-2024'][0].title;
	let intervalId;

	let places = [
		// { name: 'projects', description: 'Work and play' },
		// { name: 'links', description: 'My favorite sites around the net' },
		{ name: 'travel', description: "See where I've been" },
		{ name: 'reading', description: 'Some of my favorite books' },
		// { name: 'music', description: 'Listen to some bangers' },
		// { name: 'thoughts', description: 'My opinions on the world' },
		{ name: 'manifesto', description: 'Get a glimpse of the vision', img: '/img/think.jpg', type: 'link' },
		{ name: 'todo', description: 'Things I must do before I die', type: 'link' },
		// { name: 'recipes', description: 'Meals I make often', type: 'link' },
		{ name: 'chill', description: 'A chill splash screen with music', type: 'link' }
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

	function calculateLineCoordinates(index, totalItems, containerHeight) {
		// Convergence point is at 50% width, 10px below container
		const convergenceX = 370; // percent from left
		const convergenceY = containerHeight - 10; // pixels from top

		// Starting point of angled section (25% width)
		const startX = 1; // percent from left
		const startY = (index + 0.5) * (containerHeight / totalItems); // Vertically centered in row

		// Calculate angle and length
		const deltaX = convergenceX - startX;
		const deltaY = convergenceY - startY;
		const angleRad = Math.atan2(deltaY, deltaX);
		const angleDeg = angleRad * (180 / Math.PI);
		const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		return {
			startX,
			startY,
			length,
			angle: angleDeg
		};
	}

	function cycleLocations() {
		// Clear any existing interval
		if (intervalId) {
			clearInterval(intervalId);
		}

		// Click random location every 5 seconds
		intervalId = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * trip_data['west-coast-2024'].length);
			document.getElementById('location-' + randomIndex).click();
		}, 5000);
	}

	onMount(() => {
		age_years = calculateAge(dob);
		cycleLocations();
	});

	onDestroy(() => {
		// Clear the interval when the component is destroyed
		if (intervalId) {
			clearInterval(intervalId);
		}
	});

	$: sortedBooks = [...books].sort((a, b) => {
		const dateA = new Date(a.start);
		const dateB = new Date(b.start);
		return dateB - dateA; // Most recent first
	});
</script>

<!-- <div class="container mx-auto px-4 sm:px-6 lg:px-8">
	<section class="mb-16">
		<h2 class="text-3xl sm:text-5xl  mb-8">EXPLORE</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each places as place}
				<a href="/{place.name}" class="place-card">
					<img src={place.img ? place.img : 'img/' + place.name + '.png'} alt={place.name} class="w-full h-64 object-cover" />
					<div class="overlay">
						<h3 class="text-2xl  mb-2">{capitalizeFirstLetter(place.name)}</h3>
						<p>{capitalizeFirstLetter(place.description)}</p>
						<span class="arrow">→</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="text-3xl sm:text-5xl  mb-8">TOPICS</h2>
		<p class="text-2xl text-center">UNDER CONSTRUCTION</p>
	</section>
</div> -->

<div class="container mx-auto px-1 pb-12">
	<div class="p-4 max-w-2xl mx-auto my-12 sm:my-32">
		<h1 class="mb-4 mt-2 text-center text-3xl">Who are you?</h1>
		<p class="mb-4 text-xl font-medium">I'm a software engineer, independent student, and entrepreneur. I live abroad and like making cool things on the internet. I write about AI, automation, philosophy, and improving life with software. <a href="/about" class=" ">Read more</a></p>
	</div>
	<div class="mt-18 grid grid-cols-1 gap-2">
		{#each places.filter((place) => place.type != 'link') as place}
			<div class="mb-12 {place.name == 'travel' ? 'col-span-1 xl:col-span-2' : 'col-span-1'} p-4">
				<div class="flex items-center justify-between">
					<h2 title={place.description} class="flex-shrink-0 capitalize text-3xl mb-4 mt-2 inline"><a href="/{place.name}" class=" no-color">{place.name} </a></h2>
					<p class="font-medium inline mx-4 text-lg sm:text-xl shrink-0 subtle uppercase"><span class="text-white">// </span>{place.description}</p>
				</div>
				<!-- <p class="mb-4 font-medium inline mx-4 line-clamp-1 "><span class="text-orange-400 ">[</span><span class="mx-1 italic text-orange-400 ">{place.description}</span><span class="text-orange-400">]</span></p> -->
				<hr class="" />
				<div>
					{#if place.name == 'travel'}
						<!-- <div class="flex items-center justify-between mb-4 font-medium uppercase">
							<span class="text-2xl hover:cursor-pointer">&lt;</span>
							<h2 class="uppercase mb-4 mt-2 text-center pt-3">
								<a href="/travel/west-coast-2024" class="no-color text-lg">Pacific West Coast</a> <span class="subtle"> (1/3)</span>
							</h2>
							<span class="text-2xl hover:cursor-pointer">&gt;</span>
						</div> -->
						<!-- Mobile view -->
						<div class="block 2xl:hidden">
							<div class="flex flex-wrap shrink">
								{#each trip_data['west-coast-2024'] as location, index}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-missing-attribute -->
									<a
										id="location-{index + 1}"
										ref="/travel/west-coast-2024/w{index + 1}"
										class="no-color flex-grow p-2 font-medium border m-1 rounded-sm hover:cursor-pointer {selected_location == location.id ? '' : 'border-dotted '}"
										on:click={() => {
											selected_photo = location.cover;
											selected_location = location.id;
											selected_title = location.title;
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
								<div class="relative p-4 border border-dotted border-[ #ffa500] m-1 rounded-sm hover:cursor-pointer group" on:click={() => (window.location.href = `/travel/west-coast-2024/w${selected_location}`)}>
									<div class="absolute top-1 right-2 left-2 bg-gradient-to-b from-black to-transparent from-70% to-100% text-white text-center pt-1 pb-4 px-4 flex gap-4 lowercase font-medium">
										<a href={`/travel/west-coast-2024/w${selected_location}`} class="no-color uppercase flex-shrink-0">{selected_title}</a>
										<a href={`/travel/west-coast-2024/w${selected_location}`} class="no-color bg-purple-500 text-black px-1 sm:px-2 line-clamp-1 ml-auto">View album</a>
										<!-- <span class="text-right line-clamp-1 subtle ml-auto">{selected_photo.split('/')[4]}</span> -->
									</div>
									<img src={selected_photo} alt="preview" class="w-full h-64 object-cover" />
									<span class="absolute top-12 right-8 text-lg text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"> ↗ </span>
								</div>
							{/if}
						</div>
						<!-- Desktop view -->
						<div class="hidden 2xl:block">
							<div class="flex flex-row">
								<div class="line-menu-container" bind:clientHeight={containerHeight}>
									<div class="flex flex-col relative">
										{#each trip_data['west-coast-2024'] as location, index}
											{@const coords = calculateLineCoordinates(index, trip_data['west-coast-2024'].length, containerHeight)}
											<div
												class="line-item-wrapper {selected_location == location.id ? 'selected' : ''}"
												style="
									  --start-y: {coords.startY}px;
									  --angle: {coords.angle}deg;
									  --length: {coords.length}px;
									"
											>
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<!-- svelte-ignore a11y-no-static-element-interactions -->
												<a
													id="location-{index + 1}"
													ref="/travel/west-coast-2024/w{index + 1}"
													class="font-medium uppercase line-item-content no-color pl-12 p-2 mb-4 hover:cursor-pointer {selected_location == location.id ? 'selected' : ''}"
													on:click={() => {
														selected_photo = location.cover;
														selected_location = location.id;
														selected_title = location.title;
													}}
												>
													{location.title}
												</a>
											</div>
										{/each}
										<div class="convergence-point"></div>
									</div>
								</div>

								<style>
									.line-menu-container {
										position: relative;
										width: 100%;
									}

									.line-item-wrapper {
										position: relative;
										display: flex;
										align-items: center;
										height: 40px; /* Fixed height for consistent spacing */
									}

									/* Straight section */
									.line-item-wrapper::before {
										content: '';
										position: absolute;
										top: 73%;
										left: 0;
										width: 50%;
										height: 2px;
										background: #ff8533;
										transform-origin: right;
									}

									/* Angled section using calculated coordinates */
									.line-item-wrapper::after {
										content: '';
										position: absolute;
										top: 73%;
										left: 50%;
										width: var(--length);
										height: 2px;
										background: #ff8533;
										transform-origin: left;
										transform: translateY(-50%) rotate(var(--angle));
									}

									/* Hover effects */
									.line-item-wrapper:hover::before,
									.line-item-wrapper:hover::after {
										/* background-color: #ff8500; */
										transition: background-color 0.3s ease;
									}

									.convergence-point {
										position: absolute;
										right: 100%;
										bottom: -10px;
										width: 4px;
										height: 4px;
										/* background: #ffa500; */
										border-radius: 50%;
									}

									.line-item-content {
										position: relative;
										z-index: 2;
									}
								</style>

								{#if selected_photo}
									<div class="relative w-1/2 h-[640px] flex-shrink-0">
										<img id="desktop-photo" src={selected_photo} alt="preview" class="object-cover border-b p-2 border-[#ff8533] w-full h-full" />
										<div class="absolute bottom-2 right-2 left-2 bg-gradient-to-t from-black to-transparent from-70% to-100% text-white text-center py-6 pb-2 px-4 flex gap-8 lowercase font-medium">
											<a href={`/travel/west-coast-2024/w${selected_location}`} class="no-color uppercase flex-shrink-0">{selected_title}</a>
											<a href={`/travel/west-coast-2024/w${selected_location}`} class="no-color bg-purple-500 text-black px-2">View album</a>
											<span class="text-right line-clamp-1 subtle ml-auto">{selected_photo.split('/')[4]}</span>
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/if}
					{#if place.name == 'reading'}
						<div class="relative">
							<div class=" max-h-48 sm:max-h-96 overflow-y-auto no-scrollbar pb-10" style="scrollbar-width: thin;">
								<div class="flex flex-col space-y-2">
									{#each sortedBooks as book}
										<div class="flex items-center gap-3 pr-2 py-2">
											<div class="w-24 text-right subtle font-medium shrink-0">
												{book.start.split('/')[0] + '.' + book.start.split('/')[2]}
											</div>

											<div class="flex-1 truncate font-medium" title={book.name}>
												{book.name}
											</div>

											<div class="hidden sm:block w-48 text-right subtle font-medium truncate shrink-0">
												{book.author}
											</div>
										</div>
									{/each}
								</div>
							</div>

							<div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
						</div>
					{/if}
				</div>
			</div>
		{/each}
		<!-- Misc links -->
		<div class="grid grid-cols-1 px-6 gap-2">
			{#each places.filter((place) => place.type == 'link') as place}
				<a href="/{place.name}" class=" relative no-color static-link">
					<div class="relative border-b border-dotted p-4 hover:cursor-pointer group">
						<h2 title={place.description} class="capitalize text-xl mb-4 mt-2"><a href="/{place.name}" class="no-color">{place.name}</a></h2>
						<div>
							<p class="mb-4 font-medium">{place.description}</p>
						</div>
						<span class="absolute top-3 right-3 text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"> ↗ </span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<Footer />

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

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.line-item-wrapper.selected::before,
	.line-item-wrapper.selected::after {
		animation: blink 0.5s infinite !important;
	}

	@media (max-width: 640px) {
		.place-card .overlay {
			transform: translateY(0);
			background-color: rgba(0, 0, 0, 0.6);
		}
	}

	#desktop-photo {
		height: 100%;
		object-fit: cover;
	}
</style>
