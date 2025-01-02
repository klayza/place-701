<!-- <script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	marked.use({ breaks: true });
	export let data;
	let tripId = `west-coast-2024`;

	let url = `/data/trips/${tripId}/${data.id}.md`;
	let text = ``;
	let showScrollToTop = false;

	function initializePage(mdText) {
		let html = preProcessText(mdText);
		text = appendNavigation(html);

		window.addEventListener('scroll', handleScroll);
	}

	function handleScroll() {
		showScrollToTop = window.scrollY > 200;
	}

	onMount(async () => {
		try {
			const res = await fetch(url);
			if (res.ok) {
				let mdText = await res.text();
				initializePage(mdText);
			} else {
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
		const headers = doc.querySelectorAll('h2');
		let navHTML = '';
		headers.forEach((header, index) => {
			const id = `day-${index + 1}`;
			header.id = id;
			// const headerText = header.innerHTML.trim();
			const headerText = header.innerText.trim();
			const number = headerText.split(" ")[0] + " " + headerText.split(" ")[1];
			const text = headerText.replace(number, "").trim();
			const headerTitle = number + (text ? " - " + text : "");

			console.log(headerText.split(" "))
			navHTML += `<a href="#${id}"><li class="mb-2 text-center sm:text-left border-b border-dashed hover:bg-slate-100 p-3"><span class="text-blue-600 hover:text-blue-800">${headerTitle}</span></li></a>`;
		});
		document.querySelector('.article-navigation ul').innerHTML = navHTML;
		return doc.body.innerHTML;
	}

	function preProcessText(mdText) {
		let html = insertFragments(mdText);
		html = addExpandButtons(html);
		return html;
	}

	function insertFragments(text) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(marked(text), 'text/html');
		doc.querySelectorAll('h2').forEach((header, index) => {
			header.id = `day-${index}`;
		});
		return doc.body.innerHTML;
	}

	function addExpandButtons(articleHtml) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(articleHtml, 'text/html');
		const blockquotes = doc.querySelectorAll('blockquote');

		blockquotes.forEach((blockquote, index) => {
			const button = document.createElement('button');
			button.className = 'expand-button cursor-pointer bg-transparent border-none italic absolute z-10 rounded-full right-1/2 transform translate-x-1/2 bottom-1';
			button.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-md m-2 text-white bg-black rounded">
					<path fill="currentColor" fill-rule="evenodd" d="M12 21a1 1 0 0 1-.707-.293l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 1 1 2 0v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 12 21" clip-rule="evenodd"></path>
				</svg>
			`;
			button.setAttribute('onclick', `document.querySelector('blockquote:nth-of-type(${index + 1})').classList.toggle('expanded'); this.querySelector('svg').classList.toggle('rotate-180');`);
			blockquote.appendChild(button);
		});

		return doc.body.innerHTML;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<a href="/travel/{tripId}" class="absolute top-20 sm:top-24 left-4 sm:left-8 py-2 px-4 bg-white hover:bg-slate-100 border rounded-md shadow-md z-50">
	<i class='bx bx-arrow-back inline mr-2'></i>
	<span class="inline">Back</span>
</a>

<div class="border-b pt-12 pb-12">
	<h1 class="text-5xl  px-2 sm:px-0 text-center mt-6">West Coast Trip 2024</h1>
</div>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="article-navigation mt-8 mb-12 ">
		<ul class="space-y-2 sm:columns-2 lg:columns-3"></ul>
	</div>

	<div class="md-output">
		<img class="loading mx-auto p-12 w-16 h-16" src="/ico/loading.gif" alt="loading" />
		{@html marked(text)}
	</div>

	<p class="text-center my-10">
		<a href="/travel/{tripId}" class="text-xl text-blue-600 hover:underline">Return</a>
	</p>
</div>

{#if showScrollToTop}
	<button on:click={scrollToTop} class="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 py-2 px-4 bg-white hover:bg-slate-100 border rounded-md shadow-md z-50">
		<i class='bx bx-up-arrow-alt text-xl'></i>
	</button>
{/if}

<style>
	.md-output img {
		border-radius: 1.5rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.md-output h2 {
		font-size: 1.875rem;
		font-weight: bold;
		margin-top: 3rem;
		margin-bottom: 1.5rem;
	}

	.md-output p {
		margin-bottom: 1rem;
	}

	.md-output blockquote {
		position: relative;
		margin: 1.25rem 0;
		padding: 1rem;
		background-color: #1f2937;
		color: white;
		border: 4px solid black;
		font-style: italic;
		max-height: 12rem;
		overflow: hidden;
		transition: max-height 0.3s ease-in-out;
	}

	.md-output blockquote.expanded {
		max-height: none;
	}

	.md-output .expand-button {
		position: absolute;
		z-index: 10;
		right: 50%;
		transform: translateX(50%);
		bottom: -1rem;
		border-radius: 9999px;
		background-color: #1f2937;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s;
	}

	.md-output .expand-button svg {
		transition: transform 0.3s;
	}

	.md-output .expand-button svg.rotate-180 {
		transform: rotate(180deg);
	}

	@media (min-width: 640px) {
		.article-navigation ul {
			column-count: 2;
		}
	}

	@media (min-width: 1024px) {
		.article-navigation ul {
			column-count: 3;
		}
	}
</style> -->



<script>
	import Article from '$lib/components/Article.svelte';
	export let data;

	function getYear(startDateStr) {
    return new Date(startDateStr).getFullYear();
}

</script>

<Article title="{data.week.title}" description="" backPath="/travel/{data.trip.id}" mdPath="/data/trips/{data.trip.id}/w{data.week.id}.md" />

