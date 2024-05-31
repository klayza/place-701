<script>
	/** @type {import('./$types').PageData} */
	import { trips } from '$lib/data.js';

	function daysSinceDate(startDate) {
		const start = new Date(startDate);
		const today = new Date();
		const difference = today - start;
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		return days;
	}

	function daysDifference(startDate, endDate) {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const difference = end - start;
		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		return days;
	}
</script>

<!-- <p class="m-24 p-8 border-red-800 border"><span class="text-red-400">(NYI)</span> Here be all the places I've been on a big map! </p> -->

<!-- <main class="border-x w-full m-auto 2xl:w-9/12 h-screen"> -->
<div class="w-full p-12 pl-8 border-b tracking-widest" style="background-image: linear-gradient(to right, rgb(230, 255, 230), white, white);">
	<p class="uppercase text-3xl inline-block mr-8">travel</p>
</div>

<!-- </main> -->

<!-- <div class="map relative bg-blue-200 w-full" style="min-height: 50vh;">
	<div class="right-8 top-1/2 absolute flex items-center justify-center">
		<i class="bx bx-pin mx-1"></i>
		<p>Japan</p>
	</div>
	<div class="left-16 top-1/3 absolute flex items-center justify-center">
		<i class="bx bx-pin mx-1"></i>
		<p>Mexico</p>
	</div>
</div> -->

<h1 class="sm:mx-8 mx-4 text-2xl sm:text-4xl pb-2 mt-20 sm:mt-24">Places I've Been</h1>
<hr class="sm:mx-8 mx-4" />

<ul>
	{#each trips as trip}
		<li class="my-12 sm:my-24 sm:mx-12 list-none">
			<div class="mx-8 border">
				<!-- <div class="border-b bg-center bg-cover bg-no-repeat text-center p-8 pb-8" style="background-image: url('/img/trips/{trip.id}/cover.png')"> -->
				<div class="border-b bg-gradient-to-tr w-full from-white to-{trip.color}  bg-no-repeat text-center p-8 pb-8 ">
					<h1 class="m-auto text-xl sm:text-3xl">{trip.name} <span class="uppercase font-light text-lg">{trip.isOngoing ? `(ongoing)` : ``}</span></h1>
					<p class="text-md sm:text-lg mt-4"><a href="/travel/{trip.id}">View journal</a></p>
				</div>
				<div class="flex flex-col sm:flex-row">
					<div class="flex w-full border-b sm:border-r sm:border-b-white text-center text-md sm:text-lg px-2 p-1 sm:p-4">Start: {trip.start} {!trip.isOngoing ? '(' + daysSinceDate(trip.start) + ' days ago)' : ''}</div>
					<div class="flex w-full border-b sm:border-r sm:border-b-white text-center text-md sm:text-lg px-2 p-1 sm:p-4">
						<p>Duration:</p>
						<p class="{trip.isOngoing ? 'fade-text' : ''} ml-2" id="daysCounter">{trip.isOngoing ? daysSinceDate(trip.start) : daysDifference(trip.start, trip.end)}</p>
						<p class="ml-2">days</p>
					</div>
					<div class="flex w-full text-center text-md sm:text-lg p-1 px-2 sm:p-4">Pictures: {trip.pictures}</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style>
	@keyframes fadeInOut {
		0%,
		100% {
			opacity: 0.1;
		}
		50% {
			opacity: 1;
		}
	}

	.fade-text {
		animation: fadeInOut 3s infinite;
	}

	a {
		color: rgb(48, 60, 219);
	}
</style>
