<script>
	import Article from '$lib/components/Article.svelte';
	import SEO from '$lib/components/SEO.svelte';
	export let data;

	function getYear(startDateStr) {
		return new Date(startDateStr).getFullYear();
	}
</script>

<SEO title="{data.name} &mdash; Clayton Wieberg" description="A week spent in {data.name}. Solo adventures from around the world. Van life, backpacking, and exploring cities." image={data.cover} card={data.cover} keywords="{data.name}, van life, photos, photo log, photography, vanlife, camping, backpacking, blog, travel, adventure, exploration, solo, solo adventure" />

{#if data.entries.length > 1}
	<div class="pt-12 pb-6">
		<h1 class="text-6xl sm:text-8xl px-2 sm:px-0 text-center mt-6 uppercase">{@html data.name.split(' ').join('<br>')}</h1>
		<p class="max-w-xl px-8 sm:text-2xl text-xl sm:max-w-7xl sm:my-24 m-auto font-medium my-8 text-center">{@html data.description}</p>
	</div>

	<div class="max-w-screen-2xl mx-auto pt-0 py-12 px-4 sm:px-8">
		<p class="uppercase mt-6 text-right border-b border-dotted mb-2 font-medium text-gray-300">last post {data.end}</p>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
			{#each data.entries.sort((a, b) => a.id - b.id) as entry}
				<a href="/travel/{data.id}/w{entry.id}" class="block overflow-hidden group relative rounded-lg h-40 sm:h-96 no-color static-link">
					<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style="background-image: url({entry.cover});">
						<div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
					</div>
					<div class="relative h-full flex flex-col justify-center items-center text-white">
						<h2 class="text-4xl text-center line-clamp-3 text-shadow">{entry.title}</h2>
						<p class="text-xl absolute bottom-2 mx-auto font-medium mb-2 shadow-md text-white px-4 rounded-full">Week {entry.id}</p>
					</div>
					<!-- <div class="text-lg font-medium sm:text-2xl flex-row flex gap-4 absolute bottom-2 m-auto  mb-2 text-shadow ">
					<p class="">{weekTitle(totalMdFiles - i)}</p>
				</div> -->
				</a>
			{/each}
		</div>
	</div>

	<style>
		.text-shadow {
			text-shadow:
				1px 1px 2px rgba(0, 0, 0, 0.5),
				0 0 1px rgba(0, 0, 0, 0.5);
		}
	</style>
{:else if data.entries.length == 1}
	<Article title={data.name} description="" backPath="/travel" mdPath="/data/trips/{data.id}/w1.md" relativeImgDir="/data/trips/{data.id}/attachments/" />
{/if}
