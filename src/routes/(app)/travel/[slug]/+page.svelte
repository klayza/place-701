<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	marked.use({ breaks: true });
	export let data;

	let url = `/data/trips/${data.id}.md`;
	let text = ``;

	onMount(async () => {
		try {
			const res = await fetch(url);
			if (res.ok) {
				let pretext = await res.text();
				pretext = insertFragments(pretext);
				text = appendNavigation(pretext);
				
			} 
			else {
				console.error(`Failed to fetch: ${res.statusText}`);
				text = `<h3 class="text-center">Sorry this doesn't exist yet.</h3>`;
			}
		} catch (error) {
			console.error(`Error fetching markdown file: ${error}`);
			text = `<h3 class="text-center text-gray-600">Error loading content...</h3>`;
		}
		const loadingElement = document.querySelector('.loading');
		if (loadingElement) loadingElement.remove();
	});

	function appendNavigation(text) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(marked(text), 'text/html');
		const headers = doc.querySelectorAll('h1, h2, h3');
		let navHTML = '';
		headers.forEach((header, index) => {
			const id = `day-${index}`;
			header.id = id;
			navHTML += `<li class="article-nav-item list-none block w-1/4 float-left p-1 text-blue-500 border-dashed border-slate-200 border-b" style="font-color: #0066cc;"><a class="w-full" href="#${id}">${header.textContent}</a></li>`;
		});
		document.querySelector('.article-navigation ul').innerHTML = navHTML;
		return doc.body.innerHTML;
	}

	function insertFragments(text) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(marked(text), 'text/html');
		doc.querySelectorAll('h1, h2, h3').forEach((header, index) => {
			header.id = `day-${index}`;
		});
		return doc.body.innerHTML;
	}
</script>

<a href="/travel" class="sm:py-4 py-2 px-4 sm:px-8 m-8 absolute top-10 sm:top-12 bg-white -left-4 sm:-left-7 cursor-pointer"
	><i class="bx bx-arrow-back inline mr-4"></i>
	<p class="inline mb-2">Back</p></a
>

<!-- <div class="cover-img border-b w-full h-96 bg-center bg-no-repeat bg-cover" style="background-image: url('/{data.img}');"></div> -->
<div class="border-b pt-12 pb-12">
	<h1 class="text-5xl font-bold px-2 sm:px-0 text-center mt-6">{data.name} Trip {data.start.split(' ')[2]}</h1>
	<p class="italic mt-6 text-center text-lg">Last updated 5/12/2024</p>
	<!-- <h1 class="text-xl font-semibold text-center m-auto mt-12 max-w-4xl mb-4">{data.snippet}</h1> -->
</div>

<div class="article-navigation sm:block px-2 sm:px-18 pt-0">
	<ul class="p-4 sm:pl-20 mb-12"></ul>
</div>

<div class="max-w-5xl m-auto text-md sm:text-lg py-12 sm:py-12 cursor-default p-6 sm:p-8">
	<img class="loading m-auto p-12" src="/ico/loading.gif" alt="loading" />

	<br>

	<div class="md-output all-initial mt-12">
		{@html marked(text)}
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
</style>
