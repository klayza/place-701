<script>
	/** @type {import('./$types').PageData} */
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	marked.use({
		breaks: true

	});
	export let data;

	let url = `/src/data/${data.id}.md`;
	let text = ``;
	onMount(async () => {
		const res = await fetch(url);
		if (res.status == 200) {
			text = await res.text();
		}
		else {
			text = `<h3 class="text-center text-gray-600">Hmm, seems like I forgot to write this part</h3>`
		}
		document.querySelector(".loading").remove()

	});

	// Define the md file to pull
</script>

<div
	class="cover-img border-b w-full h-96 bg-center bg-no-repeat bg-cover"
	style="background-image: url('/{data.img}');"
></div>
<div class="border-y p-24">
	<h1 class="text-5xl font-bold text-center mt-6">{data.title}</h1>
	<h1 class="text-xl font-semibold text-center m-auto mt-12 max-w-4xl mb-4">{data.snippet}</h1>
</div>
<div class="max-w-4xl m-auto text-lg py-24 cursor-default p-8">
	<img class="loading m-auto p-12" src="/ico/loading.gif" alt="loading">
	
	<div class="md-output all-initial">{@html marked(text)}</div>
</div>

<style>
	.md-output code {
		background-color: gray !important;
	}

	/* Example to add margin specifically */
	.md-output p {
		margin-bottom: 16px !important; 
	}
</style>
