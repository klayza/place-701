<script>
	import ArticleHead from '$lib/components/ArticleHead.svelte';
	import ArticleBody from '$lib/components/ArticleBody.svelte';
</script>

<ArticleBody showNavigation="false">
	<h2 class="text-center mt-8 mb-0">Things I must do before I die.</h2>
	<p class="text-2xl text-center">✓ 2/100</p>
	<ol class="max-w-md" style="margin: auto !important;">
		<li>✗ Be fluent in Japanese</li>
		<li>✗ Go cave diving</li>
		<li>✗ Spearfish a lobster for dinner</li>
		<li>✗ Hike mount Fuji</li>
		<li>✓ <a href="/travel/west-coast-2024">Travel abroad in a van</a></li>
		<li>✗ Send my parents on a cruise</li>
		<li>✗ Visit the north or south pole</li>
		<li>✓ Become an eagle scout</li>
		<li>✗ Beat all the FNAF games</li>
		<li>✗ Start a successful business</li>
		<li>✗ Swim with whales</li>
		<li>✗ See the northern lights</li>
		<li>✗ Snowboard in Hokkaido</li>
		<li>✗ Learn to dance</li>
		<li>✗ Write a song</li>
	</ol>
</ArticleBody>

<style>
	body {
		background-color: black;
		color: white;
	}
	li {
		margin: 2px !important;
	}
</style>
