<script>
	/** @type {import('./$types').PageData} */
	import { links } from '$lib/data.js';
</script>

<div class="px-4 sm:p-4 sm:pt-24 sm:pb-12 text-xl sm:max-w-screen-lg sm:m-auto">
	<div class="flex flex-col gap-8">
		{#each links as link}
			<div class="flex  sm:flex-row gap-4 items-center font-medium">
				<a class="flex-shrink-0" href="{link.url}"><img src="/img/links/{new URL(link.url).hostname}.png" alt="{link.name}" class="w-24 sm:w-48 h-auto" /></a>
				<div class="flex-grow">
					<a href="{link.url}" target="_blank" rel="noopener noreferrer" class="no-color">{link.name} →</a>
					<hr class="mt-4">
					<p class="subtle ">{link.description}</p>
				</div>
			</div>
		{/each}
	</div>
	
</div>
