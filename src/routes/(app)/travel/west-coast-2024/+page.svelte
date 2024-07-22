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

<a href="/travel" class="sm:py-4 py-2 px-4 sm:px-8 m-8 absolute top-10 sm:top-12 bg-white -left-4 sm:-left-7 cursor-pointer">
	<i class="bx bx-arrow-back inline mr-4"></i>
	<p class="inline mb-2">Back</p>
</a>

<div class="border-b pt-12 pb-12">
	<h1 class="text-5xl font-bold px-2 sm:px-0 text-center mt-6">West Coast Trip 2024</h1>
	<p class="italic mt-6 text-center text-lg">Last updated {formatDate(mostRecentModifiedDate)}</p>
</div>

<div class="max-w-5xl mx-auto py-12 px-4 sm:px-8">
  <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {#each Array(totalMdFiles) as _, i}
      <a href="/travel/west-coast-2024/w{i + 1}" class="block border-black border-2 overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-36">
        <div class="bg-black text-white py-2 text-center">
          <p class="text-2xl font-bold">Week {i + 1}</p>
        </div>
        <div class="relative h-[calc(100%-2.5rem)]" style="background-image: url({weekCover(i + 1)}); background-size: cover; background-position: center;">
          <div class="absolute inset-0 bg-white opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div class="relative p-4 h-full flex items-center justify-center">
            <p style="font-family: Marker;" class="text-2xl text-center text-black line-clamp-3">{weekTitle(i + 1)}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
<style>
	img {
		border-radius: 40px !important;
	}
	h2 {
		margin-bottom: 50px;
		margin-top: 50px !important;
	}
	.md-output code {
		background-color: gray !important;
	}
	/* Example to add margin specifically */
	.md-output p {
		margin-bottom: 16px !important;
	}
	.article-navigation a {
		color: #0066cc !important;
		/* text-decoration: none; */
	}
	.annotation {
		display: none;
	}
	.md-output blockquote {
		position: relative;
		margin: 20px !important;
		padding: 10px;
		background-color: #262626;
		color: white;
		border: 5px solid #000000;
		font-style: italic;
		max-height: 200px;
		overflow: hidden;
		transition: max-height 0.3s ease;
	}
	.md-output blockquote.expanded {
		max-height: fit-content; /* Set a high value to accommodate the full content */
	}
	.md-output .expand-button {
		cursor: pointer;
		position: absolute;
		z-index: 10;
		right: 50%;
		transform: translateX(50%);
		bottom: 5px;
		border-radius: 50%;
		background-clip: padding-box;
		border: 1px solid #000000;
		background-color: #262626;
		padding: 0.5em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.text-shadow {
		text-shadow:
			1px 1px 2px rgba(0, 0, 0, 0.5),
			0 0 1px rgba(0, 0, 0, 0.5);
	}
</style>
