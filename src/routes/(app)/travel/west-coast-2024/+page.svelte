<script>
  // @type {import('./$types').PageData}
  export let data;
  const { totalMdFiles, mostRecentModifiedDate, weekData } = data;
  console.log(weekData);
  function weekTitle(weekNum) {
    const week = weekData.find((w) => w.week == weekNum);
    if (!week) {
      return ' ';
    } else if (week.title) {
      return '' + week.title;
    } else {
      return ' ';
    }
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  function weekCover(weekNum) {
    const week = weekData.find((w) => w.week == weekNum);
    return week?.cover || '';
  }
</script>

<a href="/travel" class="sm:py-4 py-2 px-4 sm:px-8 m-8 absolute top-10 sm:top-12 bg-white -left-4 sm:-left-7 cursor-pointer z-10">
  <i class="bx bx-arrow-back inline mr-4"></i>
  <p class="inline mb-2">Back</p>
</a>

<div class="border-b pt-12 pb-12">
  <h1 class="text-5xl font-bold px-2 sm:px-0 text-center mt-6">West Coast Trip 2024</h1>
  <p class="italic mt-6 text-center text-lg">Last updated {formatDate(mostRecentModifiedDate)}</p>
</div>
<div class="max-w-5xl mx-auto py-12 px-4 sm:px-8">
  <div class="space-y-8">
    {#each Array(totalMdFiles) as _, i}
      <a href="/travel/west-coast-2024/w{i + 1}" class="block overflow-hidden group relative h-64">
        <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style="background-image: url({weekCover(i + 1)});">
          <div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
        </div>
        <div class="relative h-full flex flex-col justify-center items-center text-white">
          <p style="font-family: Marker;" class="text-3xl text-center line-clamp-3 text-shadow">{weekTitle(i + 1)}</p>
          <p class="text-2xl absolute bottom-2 left-4 font-bold mb-2 text-shadow italic text-gray-200">Week {i + 1}</p>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .text-shadow {
    text-shadow:
      1px 1px 2px rgba(0, 0, 0, 0.5),
      0 0 1px rgba(0, 0, 0, 0.5);
  }
</style>