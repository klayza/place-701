<script>
	import ArticleHead from '$lib/components/ArticleHead.svelte';
	import ArticleBody from '$lib/components/ArticleBody.svelte';
</script>

<div class="px-4">
	<ArticleBody showNavigation="false">
		<h2 class="text-center mt-8 mb-0">Things I must do before I die.</h2>
		<p class="text-2xl text-center font-medium">✓ 2/100</p>
		<ol class="max-w-md font-medium" style="margin: auto !important;">
			<li>✗ Be fluent in Japanese</li>
			<li>✗ Go cave diving</li>
			<li>✗ Spearfish a lobster for dinner</li>
			<li>✗ Hike mount Fuji</li>
			<li class="text-green-200">✓ <a  href="/travel/west-coast-2024">Travel abroad in a van</a></li>
			<li>✗ Send my parents on a cruise</li>
			<li>✗ Visit the north or south pole</li>
			<li class="text-green-200">✓ Become an eagle scout</li>
			<li>✗ Beat all the FNAF games</li>
			<li>✗ Start a successful business</li>
			<li>✗ Swim with whales</li>
			<li>✗ See the northern lights</li>
			<li>✗ Snowboard in Hokkaido</li>
			<li>✗ Learn to dance</li>
			<li>✗ Make a song</li>
			<li>✗ Get a bachelors degree</li>
		</ol>
	</ArticleBody>
	
</div>
<style>
	li {
		margin: 2px !important;
	}
</style>
