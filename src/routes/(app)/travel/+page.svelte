<script>
  // @type {import('./$types').PageData}
  import { trips } from '$lib/data.js';
  function daysSinceDate(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const difference = today - start;
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }
  function daysDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start;
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }
</script>

<header class="w-full bg-black text-white text-2xl p-4 sticky top-0">Travel</header>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
  {#each trips as trip}
    <li class="list-none">
      <div class="border-2 border-black overflow-hidden h-full flex flex-col">
        <div class="bg-white p-6 flex-grow flex flex-col">
          <h2 class="text-3xl font-bold mb-2 border-b-black">{trip.name}</h2>
          {#if trip.isOngoing}

					{/if}
          <div class="flex-grow flex flex-col justify-end">
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p class="font-semibold">Start</p>
                <p>{trip.start}</p>
              </div>
              <div>
                <p class="font-semibold">Duration</p>
                <p>{trip.isOngoing ? daysSinceDate(trip.start) : daysDifference(trip.start, trip.end)} days</p>
              </div>
            </div>
            <div class="mt-4">
              <p class="font-semibold">Pictures</p>
              <p>{trip.pictures}</p>
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