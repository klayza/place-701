<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	marked.use({ breaks: true });
	export let data;

	let url = `/data/trips/west-coast-2024/${data.id}.md`;
	let text = ``;

	function initializePage(mdText) {
		let html = preProcessText(mdText);
		text = appendNavigation(html);

		window.addEventListener('beforeunload', function () {
			localStorage.setItem('scrollPosition', window.location.hash);
		});

		window.addEventListener('DOMContentLoaded', function () {
			const scrollPosition = localStorage.getItem('scrollPosition');
			if (scrollPosition) {
				window.location.hash = scrollPosition;
				localStorage.removeItem('scrollPosition');
			}
		});
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
		const headers = doc.querySelectorAll('h1, h2, h3');
		let navHTML = '';
		headers.forEach((header, index) => {
			const id = `day-${index + 1}`;
			header.id = id;
			navHTML += `<li class="article-nav-item list-none block w-1/4 float-left p-1 text-blue-500 border-dashed border-slate-200 border-b" style="font-color: #0066cc;"><a class="w-full" href="#${id}">${header.firstChild.nodeValue.trim()}</a></li>`;
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
		doc.querySelectorAll('h1, h2, h3').forEach((header, index) => {
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
			button.className = 'expand-button cursor-pointer bg-transparent border-none italic absolute z-10 rounded-full right-1/2 juice:translate-x-1/2 bottom-1';
			button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-md m-1 text-token-text-primary">
                <path fill="red" fill-rule="evenodd" d="M12 21a1 1 0 0 1-.707-.293l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 1 1 2 0v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 12 21" clip-rule="evenodd"></path>
            </svg>
        `;
			button.setAttribute('onclick', `document.querySelector('blockquote:nth-of-type(${index + 1})').classList.toggle('expanded'); this.querySelector('svg').classList.toggle('rotated');`);
			// button.setAttribute("onclick", "() => {toggleBlockQuote(self)}")
			// button.innerText = ""
			blockquote.appendChild(button);
		});

		return doc.body.innerHTML;
	}
</script>

<a href="/travel" class="sm:py-4 py-2 px-4 sm:px-8 m-8 absolute top-10 sm:top-12 bg-white -left-4 sm:-left-7 cursor-pointer">
	<i class="bx bx-arrow-back inline mr-4"></i>
	<p class="inline mb-2">Back</p>
</a>

<!-- <div class="cover-img border-b w-full h-96 bg-center bg-no-repeat bg-cover" style="background-image: url('/{data.img}');"></div> -->
<div class="border-b pt-12 pb-12">
	<h1 class="text-5xl font-bold px-2 sm:px-0 text-center mt-6">West Coast Trip 2024</h1>
	<p class="italic mt-6 text-center text-lg">Last updated 6/9/2024</p>
	<!-- <h1 class="text-xl font-semibold text-center m-auto mt-12 max-w-4xl mb-4">{data.snippet}</h1> -->
</div>

<div class="article-navigation sm:block px-2 sm:px-18 pt-0">
	<ul class="p-4 sm:pl-20 mb-12"></ul>
</div>

<div class="max-w-5xl m-auto text-md sm:text-lg py-12 sm:py-12 cursor-default p-6 sm:p-8">
	<img class="loading m-auto p-12" src="/ico/loading.gif" alt="loading" />

	<br />

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
