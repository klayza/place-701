<script>
	import ArticleBody from '$lib/components/ArticleBody.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import todo from '/src/lib/data/todo.json';
	const totalDone = todo.filter((item) => item.done).length;
</script>

<div class="px-4 pt-4 sm:p-4 sm:pt-24 sm:max-w-screen-lg sm:m-auto">
	<h2 class="mt-8 mb-4 text-6xl">Todo </h2>
	<p class="font-medium text-xl sm:text-2xl">Things I must to before I die. Inspired by Chip Huyen's <a href="https://huyenchip.com/list-100/">List 100.</a> <span class="text-green-300">Done {totalDone}/{todo.length}</span>.</p>
</div>

<ArticleBody showNavigation="false">
	<!-- <h2 class="text-center mt-8 mb-0 text-4xl">Things I must do before I die.</h2> -->
	<p class="text-2xl text-center font-medium"></p>
	<ol class="px-8 font-medium" style="margin: auto !important;">
		{#each todo as item}
			<li class="text-lg sm:text-xl"><span class={item.done ? 'text-green-400' : ''}>{item.done ? '✓' : '✗'} {item.text}</span></li>
		{/each}
	</ol>
</ArticleBody>

<Footer />

<style>
	li {
		margin: 2px !important;
	}
</style>
