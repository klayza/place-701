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
	function daysDifference(startDate, endDate) {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const difference = end - start;
		return Math.floor(difference / (1000 * 60 * 60 * 24));
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

	function timeAgo(date) {
		const now = new Date();
		const diff = now - new Date(date);

		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) {
			return `${years}y ago`;
		} else if (months > 0) {
			return `${months}mo ago`;
		} else if (days > 0) {
			return `${days} days ago`;
		} else if (hours > 0) {
			return `${hours}h ago`;
		} else if (minutes > 0) {
			return `${minutes}m ago`;
		} else {
			return `${seconds}s ago`;
		}
	}

	// Example usage:
	console.log(timeAgo('2023-08-01T12:00:00Z')); // Outputs something like "1mo ago"
</script>

<SEO title="Travel &mdash; Clayton Wieberg" />

<header class="w-full bg-black text-white text-2xl p-4 sticky top-0">Travel</header>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
	{#each trips as trip}
		<li class="list-none">
			<div class="border-2 border-black overflow-hidden h-full flex flex-col">
				<div class="bg-white p-6 flex-grow flex flex-col">
					<h2 class="text-3xl font-bold mb-2 border-b-black">{trip.name}</h2>
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
</ul>
