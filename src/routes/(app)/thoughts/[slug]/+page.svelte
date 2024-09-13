<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import Article from '$lib/components/Article.svelte';
	import ArticleHead from '$lib/components/ArticleHead.svelte';
	import ArticleBody from '$lib/components/ArticleBody.svelte';
	import SM from '../sm.svelte';
	// import MDoutput from '$lib/components/MDoutput.svelte';
</script>

{#if data.source == 'md'}
	<Article title={data.title} description={data.snippet} backPath="/thoughts" mdPath="/data/{data.id}.md" html="deez"></Article>
{:else}
	<ArticleHead backPath="/thoughts" title={data.title} ></ArticleHead>
	<ArticleBody backPath="/thoughts">
		{#if data.id == 'sm'}
			<SM></SM>
		{/if}
	</ArticleBody>
{/if}
