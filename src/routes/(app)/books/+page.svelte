<script>
	/** @type {import('./$types').PageData} */
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	marked.use({ breaks: true });
	export let data;

	let url = `/data/books.md`;
	let text = ``;

	onMount(async () => {
		try {
			const res = await fetch(url);
			if (res.ok) {
				text = await res.text();
			} else {
				console.error(`Failed to fetch: ${res.statusText}`);
				text = `<h3 class="text-center">Sorry, this doesn't exist yet.</h3>`;
			}
		} catch (error) {
			console.error(`Error fetching markdown file: ${error}`);
			text = `<h3 class="text-center text-gray-600">Error loading content...</h3>`;
		}
		// Assuming there's an element with the class 'loading' to be removed
		const loadingElement = document.querySelector('.loading');
		if (loadingElement) loadingElement.remove();
	});
</script>

<!-- <a href="/" class="py-4 px-8 m-4 mt-4 border absolute top-20 bg-white hover:bg-slate-100 left-0 cursor-pointer "><i class='bx bx-arrow-back inline mr-4'></i><p class="inline mb-2">Back</p></a> -->

<p class="w-full bg-black text-white text-2xl z-10 p-4">Reading List</p>

<!-- <div class="cover-img border-b w-full h-96 bg-center bg-no-repeat bg-cover" style="background-image: url('/{data.img}');"></div> -->
<!-- <div class="border-y p-24">
	<h1 class="text-5xl font-bold text-center mt-6">{data.title}</h1>
	<h1 class="text-xl font-semibold text-center m-auto mt-12 max-w-4xl mb-4">{data.snippet}</h1>
</div> -->
<div class="max-w-5xl m-auto text-lg py-24 cursor-default p-8">
	<p class="italic text-md sm:text-xl">I love to read, and have actually just begun to read regularly. My goal is to read two books a month. I have setup a deal with family to pay them $100 for every book I fail to complete.</p>

	<img class="loading m-auto p-12" src="/ico/loading.gif" alt="loading" />

	<div class="md-output all-initial text-sm sm:text-xl mt-20">{@html marked(text)}</div>
</div>

<style>
	.md-output code {
		background-color: gray !important;
	}

	/* Example to add margin specifically */
	.md-output p {
		margin-bottom: 16px !important;
	}

	li {
		list-style-position: outside !important;
	}

	a {
		color: rgb(48, 60, 219);
	}

</style>
