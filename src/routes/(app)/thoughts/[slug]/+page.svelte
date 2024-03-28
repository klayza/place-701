<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>


<div class="cover-img border-b w-full h-64" style="background-image: url('{data.img}');"></div>
<h1 class="text-5xl">{data.title}</h1>
<div class="content max-w-4xl m-auto">{@html data.content}</div>

<style>
	.cover-img {
		/* background-image: url('{data.img}') */
	}
</style>