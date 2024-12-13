<script>
	let pages = [
		{ name: 'projects', url: '/projects' },
		{ name: 'thoughts', url: '/thoughts' },
		{ name: 'links', url: '/links' },
		{ name: 'about', url: '/about' }
	];
</script>

<header class="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<h1 class="text-3xl sm:text-4xl font-bold mb-4 text-center"><a href="/" class="no-color">CLAYTON WIEBERG</a></h1>
	<div class="flex justify-center pb-3">
		{#each pages as page}
			<a href={page.url} class="btn-primary mx-2 uppercase no-color">{page.name}</a>
		{/each}
	</div>
</header>

<!-- 
	<p class="text-xl sm:text-2xl mb-8">I'm a software engineer, independent student, and entrepreneur. I live abroad and make cool things on the internet. I write about AI, automation, philosophy, and improving life with software.</p>
	<a href="/about" class="btn-primary">Read More →</a>

-->
