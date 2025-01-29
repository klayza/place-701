<script>
	// import { trips, trip_data } from '$lib/data.js';
	// import trip json

	import trips from '/src/lib/data/trips.json';
	console.log(trips);

	import SEO from '$lib/components/SEO.svelte';

	function daysDifference(startDate, endDate, id) {
		let subtractor = 0;
		if (id == 'west-coast-2024') {
			// When I flew back to missouri
			subtractor = 23;
		}

		const start = new Date(startDate);
		const end = endDate ? new Date(endDate) : new Date();
		const difference = end - start;
		return Math.floor(difference / (1000 * 60 * 60 * 24)) - subtractor;
	}

	function getYear(startDateStr) {
		return new Date(startDateStr).getFullYear();
	}

	function getLastUpdated(tripID) {
		// Find the most recent update date
		const mostRecentDate = trip_data[tripID].reduce((mostRecent, week) => {
			if (week.updated) {
				const updateDate = new Date(week.updated);
				return updateDate > mostRecent ? updateDate : mostRecent;
			}
			return mostRecent;
		}, new Date(0));

		return mostRecentDate;
	}

	function generateDescription() {
		let places = [];
		trips.forEach((trip) => {
			places.push(trip.name);
		});
		console.log(places.join(', '));
		return places.join(', ');
	}
</script>

<SEO title="Travel &mdash; Clayton Wieberg" description="Solo adventures from around the world. Van life, backpacking, and exploring cities." keywords="van life, photos, photo log, photography, vanlife, camping, backpacking, blog, travel, adventure, exploration, solo, solo adventure, {generateDescription()}" />

<div class="max-w-[90%] mx-auto my-12 sm:my-36 pt-0 sm:px-8 mb-6">
	<!-- <canvas id="continents"></canvas> -->

	<!-- <p class="text-lg my-24">Check out some of the places I've been to! I like going to new places and trying different ways of life. From living out of a van along the pacific west coast to enjoying ramen in Tokyo, I hope to try a little piece of everything. There are dozens of photos in each entry as well as some commentary, so give it a read.</p> -->

	<h2 class="text-6xl sm:text-8xl text-center mb-8">Travel</h2>
	<p class="text-center font-medium text-2xl mb-8">Solo adventures from <span class="gay-text">around the world</span>. Van life, backpacking, and exploring cities. I hope to visit one new country every year.</p>
	<div class="space-y-4">
		{#each trips.filter((trip) => !trip.hidden) as trip}
			<a href="/travel/{trip.id}" class="block overflow-hidden group relative w-full m-auto h-[500px] no-color static-link rounded-xl lg:rounded-full">
				<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style="background-image: url({trip.cover});">
					<div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
				</div>
				<div class="relative h-full flex flex-col justify-center items-center font-medium text-white">
					<h1 class="text-3xl sm:text-6xl text-center line-clamp-3 text-shadow">
						{trip.name}
					</h1>

					<div class="text-lg sm:text-2xl flex-row flex gap-4 absolute bottom-2 m-auto mb-2 text-shadow">
						{#if daysDifference(trip.start, trip.end, trip.id) < 0}
							<p class="text-blue-300">In {Math.abs(daysDifference(trip.start, trip.end, trip.id))} days</p>
						{:else}
						<p>{daysDifference(trip.start, trip.end, trip.id)} days</p>
						{/if}

						<p class="">▪</p>
						<p>{getYear(trip.start)}</p>
						<p class="">▪</p>
						<p>{trip.pictures} photos</p>
						{#if trip.end === '' && new Date(trip.start) <= new Date()}
							<p class="">▪</p>
							<p class="text-green-300">Ongoing</p>
						{:else if trip.end === '' && new Date(trip.start) > new Date()}
							<p class="">▪</p>
							<p class="text-blue-300">Upcoming</p>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
