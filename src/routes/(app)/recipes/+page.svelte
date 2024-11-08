<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { recipes } from '$lib/data.js';
</script>

<div class="w-full p-12 pl-8 border-b tracking-widest" style="background-image: linear-gradient(to right, rgb(230, 255, 255), white, white);">
	<h2 class="uppercase text-3xl inline-block mr-8">recipes</h2>
</div>

<div class="sm:p-4 p-2 m-2 pt-12 pb-20 sm:pt-24 text-xl sm:max-w-screen-sm sm:m-auto">
	<ul class="">
		{#each recipes as recipe}
			<li class="my-12">
				<a href="/recipes/{recipe.id}" class="text-black"><div class="border p-8 border-black">{recipe.name}</div></a>
			</li>
		{/each}
	</ul>
</div>
