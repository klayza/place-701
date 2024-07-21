<script>
  // @type {import('./$types').PageData}
  export let data;
  const { totalMdFiles, mostRecentModifiedDate } = data;
</script>

<a href="/travel" class="sm:py-4 py-2 px-4 sm:px-8 m-8 absolute top-10 sm:top-12 bg-white -left-4 sm:-left-7 cursor-pointer">
	<i class="bx bx-arrow-back inline mr-4"></i>
	<p class="inline mb-2">Back</p>
</a>

<div class="border-b pt-12 pb-12">
	<h1 class="text-5xl font-bold px-2 sm:px-0 text-center mt-6">West Coast Trip 2024</h1>
	<p class="italic mt-6 text-center text-lg">{mostRecentModifiedDate}</p>
</div>

<div class="article-navigation sm:block px-2 sm:px-18 pt-0">
	<ul class="p-4 sm:pl-20 mb-12"></ul>
</div>

<div>
	{#each {length: totalMdFiles} as _, i}
		<a class="border" href="/travel/west-coast-2024/w{i}">
			<p>Week {i}</p>
		</a>	
	{/each}
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
</style>
