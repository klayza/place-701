<script>
	/** @type {import('./$types').PageData} */
	import Footer from '$lib/components/Footer.svelte';
	import ArticleBody from '$lib/components/ArticleBody.svelte';
</script>

<!-- <div class="flex h-screen justify-center items-center"><p class="text-5xl text-center">UNDER CONSTRUCTION</p></div> -->

<div class="px-4 pt-4 sm:p-4 sm:pt-24 sm:max-w-screen-lg sm:m-auto text-xl sm:text-2xl">
	<h2 class="mt-8 mb-4 text-6xl">About</h2>
	<p class="font-medium">Clayton Wieberg. I'm a developer, student, entrepreneur.</p>
	<br />
	<div class="text-xl font-medium">
		<span class="text-2xl font-medium">Some things about me:</span>
		<ul class="list-inside my-4 font-sans" style="list-style-type: square;">
			<li>Computer Science student</li>
			<li>From Phoenix, Arizona</li>
			<li>Software Engineer</li>
			<li>CEO, CFO, CLO, LOL</li>
			<li>Scuba Diver</li>
			<li>Learning Japanese</li>
			<li>Hardcore Nature Enjoyer</li>
		</ul>
		<span class="text-2xl font-medium">Things I like to do:</span>
		<ul class="list-inside my-4 font-sans" style="list-style-type: square;">
			<li>Make pretty websites (inspiried by cyberpunk!)</li>
			<li>Code video games</li>
			<li><a href="/travel">Explore the world</a>! <i>and beyond</i></li>
			<li><a href="/reading">Read scifi</a> (metaphysics is fascinating)</li>
			<li>Make robots</li>
			<li>Skating</li>
			<li>Play video games</li>
			<li>Backpacking</li>
			<li>Simulation theory</li>
		</ul>
	</div>
</div>

<Footer />
