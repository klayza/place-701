<script>
	// @type {import('./$types').PageData}
	import { trips, trip_data } from '$lib/data.js';
	import SEO from '$lib/components/SEO.svelte';

	function daysSinceDate(startDate, id = '') {
		let subtractor = 0;
		if (id == 'west-coast-2024') {
			// When I flew back to missouri
			subtractor = 23;
		}

		const start = new Date(startDate);
		const today = new Date();
		const difference = today - start;
		return Math.floor(difference / (1000 * 60 * 60 * 24)) - subtractor;
	}
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

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function generateDescription() {
		let places = []
		trips.forEach(trip => {
			places.push(trip.name)
		});
		console.log(places.join(', '))
		return places.join(', ')
	}


	// Example usage:
</script>

<SEO title="Travel &mdash; Clayton Wieberg" description="Solo adventures from around the world. Van life, backpacking, and exploring cities." keywords="van life, photos, photo log, photography, vanlife, camping, backpacking, blog, travel, adventure, exploration, solo, solo adventure, {generateDescription()}" />

<!-- <header class="w-full bg-black text-white text-2xl p-4 sticky top-0">Travel</header> -->

<!-- <div class="w-full p-12 pl-8 border-b tracking-widest" style="background-image: linear-gradient(to right, rgb(255, 230, 255), white, white);">
	<h2 class="uppercase text-3xl inline-block mr-8">travel</h2>
</div> -->

<!-- <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 m-auto sm:max-w-screen-lg">
	{#each trips as trip}
		<li class="list-none">
			<div class="border-2 border-black overflow-hidden h-full flex flex-col">
				<div class="bg-white p-6 flex-grow flex flex-col">
					<h2 class="text-3xl  mb-2 border-b-black">{trip.name}</h2>
					{#if trip.isOngoing}
						<span class="bg-green-300 rounded-full px-2 w-fit">ONGOING</span>
					{/if}
					<div class="flex-grow flex flex-col justify-end">
						<div class="grid grid-cols-2 gap-4 mt-4">
							<div>
								<p class="font-semibold">Start</p>
								<p>{trip.start}</p>
							</div>
							<div>
								<p class="font-semibold">Duration</p>
								<p>{trip.isOngoing ? daysSinceDate(trip.start, trip.id) : daysDifference(trip.start, trip.end)} days</p>
							</div>
						</div>
						<div class="grid grid-cols-2 gap-4 mt-4">
							<div class="mt-4">
								<p class="font-semibold">Pictures</p>
								<p>{trip.pictures}</p>
							</div>

							{#if trip.isOngoing}
								<div class="mt-4">
									<p class="font-semibold">Last Updated</p>
									<p>{timeAgo(getLastUpdated(trip.id))}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="bg-black text-white p-4 text-center">
					<a href="/travel/{trip.id}" class="hover:underline">View journal</a>
				</div>
			</div>
		</li>
	{/each}
</ul> -->

<div class="max-w-[90%] mx-auto my-12 sm:my-36  pt-0  sm:px-8 mb-6">
	
	
	<!-- <canvas id="continents"></canvas> -->


	
	<!-- <p class="text-lg my-24">Check out some of the places I've been to! I like going to new places and trying different ways of life. From living out of a van along the pacific west coast to enjoying ramen in Tokyo, I hope to try a little piece of everything. There are dozens of photos in each entry as well as some commentary, so give it a read.</p> -->
	 

	<h2 class="text-6xl sm:text-8xl text-center  mb-8">Travel</h2>
	<p class="text-center font-medium text-2xl mb-8">Solo adventures from <span class="gay-text">around the world</span>. Van life, backpacking, and exploring cities. I hope to visit one new country every year.</p>
	<div class="space-y-4">
		{#each trips as trip}
			<a href="/travel/{trip.id}" class="block overflow-hidden group relative w-full m-auto h-[500px] no-color static-link rounded-xl md:rounded-full ">
				<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style="background-image: url({trip.img});">
					<div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
				</div>
				<div class="relative h-full flex flex-col justify-center items-center font-medium text-white">
					<h1  class="text-3xl sm:text-6xl text-center line-clamp-3 text-shadow">
						{trip.name}
					</h1>

					<div class="text-lg sm:text-2xl flex-row flex gap-4 absolute bottom-2 m-auto  mb-2 text-shadow ">
						<p>{daysDifference(trip.start, trip.end, trip.id)} days</p>
						<p class=""> ▪ </p>
						<p>{getYear(trip.start)}</p>
						<!-- <p class="before:content-['•'] before:mr-3 text-green-300">ongoing</p>
						<p class="before:content-['•'] before:mr-3">2024</p> -->
						{#if trip.end === ''}
							<p>/</p>
							<p class="text-green-300">Ongoing</p>
							<!-- <p class="bg-green-300 mt-2 rounded-full px-2 w-fit m-auto text-sm" style="font-family: ''">ONGOING</p> -->
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>


<!-- 
<a href="/travel/west-coast-2024/w{totalMdFiles - i}" class="block overflow-hidden group relative h-80 no-color static-link">
	<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style="background-image: url({weekCover(totalMdFiles - i)});">
		<div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
	</div>
	<div class="relative h-full flex flex-col justify-center items-center text-white">
		<h2 class="text-3xl text-center line-clamp-3 text-shadow">{weekTitle(totalMdFiles - i)}</h2>
		<p class="text-2xl absolute bottom-2 left-4 font-medium  mb-2  bg-white text-black px-4 rounded-full  ">Week {totalMdFiles - i}</p>
	</div>
</a> -->
