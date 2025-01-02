<script>
  export let age = 20;
  export let ageDeath = 70;
  export let variables = [];

  $: weeks = age * 52;
  $: totalWeeks = ageDeath * 52;

  $: grid = Array(totalWeeks).fill().map((_, i) => {
    if (i < weeks) return 'bg-gray-300'; // Past
    let currentWeek = weeks;
    for (let v of variables) {
      if (i >= currentWeek && i < (currentWeek + v.weeks)) {
        return v.color;
      }
      currentWeek += v.weeks;
    }
    return 'bg-white'; // Future
  });

  $: legendItems = [
    { label: 'Future', color: 'bg-white' },
    { label: 'Past', color: 'bg-gray-300' },
    ...variables
  ];
</script>

<div class="mb-6">
  <div class="flex flex-wrap justify-around mb-4">
    {#each legendItems as item}
      <div class="flex items-center m-1">
        <div class={`w-4 h-4 border  ${item.color} mr-2`}></div>
        <span>{item.label}</span>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-52 gap-0.5 sm:gap-2">
    {#each grid as cellClass}
      <div class={`w-1 h-1 sm:w-2 sm:h-2  ${cellClass}`}></div>
    {/each}
  </div>
</div>

<style>
  .grid-cols-52 {
    grid-template-columns: repeat(52, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    .grid-cols-52 {
      grid-template-columns: repeat(26, minmax(0, 1fr));
    }
  }
</style>