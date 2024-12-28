<script>
	let pages = [
		{ name: 'projects', url: '/projects', color: "text-blue-400" },
		{ name: 'thoughts', url: '/thoughts', color: "text-green-400" },
		{ name: 'links', url: '/links', color: "text-red-400" },
		{ name: 'about', url: '/about', color: "text-yellow-400" }
	];
	let selected = '';
</script>

<header class="mx-auto px-4 py-4 pt-8 lg:px-8 lg:py-8">
	<h1 on:click={() => selected = ''} class="text-3xl sm:text-4xl font-bold mb-4 text-center"><a href="/" class="no-color">CLAYTON WIEBERG</a></h1>
	<div class="flex justify-center pb-3 bg-gradient-to-b from-black to-transparent">
		{#each pages as page}
			<a href={page.url} id={page.name} class="btn-primary mx-2 uppercase no-color {selected == page.name ? page.color : ''}" on:click={() => selected = page.name}>{page.name}</a>
		{/each}
	</div>
</header>

