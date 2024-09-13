<script>
	import Article from '$lib/components/Article.svelte';
	export let data;

	function getYear(startDateStr) {
    return new Date(startDateStr).getFullYear();
}

</script>

<Article title="{data.name + " " + getYear(data.start)}" description="" backPath="/travel" mdPath="/data/trips/{data.id}.md" />

