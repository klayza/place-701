<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	marked.use({ breaks: true });

	let showScrollToTop = false;
	export let url;
	export let backPath;
	let text = ``;

	function handleScroll() {
		showScrollToTop = window.scrollY > 200;
	}

	function initializePage(mdText) {
		let html = preProcessText(mdText);
		text = appendNavigation(html);

		window.addEventListener('scroll', handleScroll);
	}

	onMount(async () => {
		if (typeof window !== 'undefined') {
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
		}
	});

	function appendNavigation(text) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(marked(text), 'text/html');
		const headers = doc.querySelectorAll('h2');
		let navHTML = '';
		headers.forEach((header, index) => {
			const id = `day-${index + 1}`;
			header.id = id;
			const headerText = header.innerText.trim();
			const number = headerText.split(' ')[0] + ' ' + headerText.split(' ')[1];
			const text = headerText.replace(number, '').trim();
			const headerTitle = number + (text ? ' - ' + text : '');

			console.log(headerText.split(' '));
			navHTML += `<a class="no-color" href="#${id}"><li class="mb-2  text-center sm:text-left border-b border-dotted  p-3"><span class=" ">${headerTitle}</span></li></a>`;
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

<img class="loading mx-auto p-12 w-16 h-16" src="/ico/loading.gif" alt="loading" />
{@html marked(text)}

{#if text !== ''}
	<p class="text-center my-10">
		<a href={backPath} class="text-xl hover:underline">Return</a>
	</p>
{/if}

{#if showScrollToTop}
	<button on:click={scrollToTop} class="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 py-2 px-4 bg-black  border  shadow-md z-50">
		<i class="bx bx-up-arrow-alt text-xl"></i>
	</button>
{/if}
