<script>
	import ArticleHead from '$lib/components/ArticleHead.svelte';
	import ArticleBody from '$lib/components/ArticleBody.svelte';
	import MDoutput from '$lib/components/MDoutput.svelte';

	export let title;
	export let description;
	export let backPath;
	export let mdPath;
	export let relativeImgDir
</script>

<ArticleHead {backPath} {title} {description}></ArticleHead>
<ArticleBody>
	<MDoutput url={mdPath} backPath={backPath} relativeImgDir={relativeImgDir}></MDoutput>
</ArticleBody>
