<script>
	import Article from '$lib/components/Article.svelte';
	import SEO from '$lib/components/SEO.svelte';
	export let data;

	function getYear(startDateStr) {
    return new Date(startDateStr).getFullYear();
}

</script>

<SEO title="{data.name} &mdash; Clayton Wieberg" description="A week spent in {data.name}. Solo adventures from around the world. Van life, backpacking, and exploring cities." image={data.img} card={data.img} keywords="{data.name}, van life, photos, photo log, photography, vanlife, camping, backpacking, blog, travel, adventure, exploration, solo, solo adventure" />
<Article title="{data.name + " " + getYear(data.start)}" description="" backPath="/travel" mdPath="/data/trips/{data.id}.md" />

