<script>
	import Article from '$lib/components/Article.svelte';
	import SEO from '$lib/components/SEO.svelte';
	export let data;

	function getYear(startDateStr) {
		return new Date(startDateStr).getFullYear();
	}
</script>

<SEO title="{data.week.title} &mdash; Clayton Wieberg" description="A week spent in {data.week.title}. Solo adventures from around the world. Van life, backpacking, and exploring cities." image={data.week.cover} card={data.week.cover} keywords=" {data.week.title}, van life, photos, photo log, photography, vanlife, camping, backpacking, blog, travel, adventure, exploration, solo, solo adventure" />
<Article title={data.week.title} description="" backPath="/travel/{data.trip.id}" mdPath="/data/trips/{data.trip.id}/w{data.week.id}.md" />
