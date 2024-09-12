<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { recipes } from '$lib/data.js';
</script>

<p class="w-full bg-black uppercase text-white text-2xl z-10 p-4">Recipes</p>

<div class="sm:p-4 p-2 m-2 pt-12 pb-20 sm:pt-24 text-xl sm:max-w-screen-sm sm:m-auto">
	<ul class="">
		{#each recipes as recipe}
			<li class="my-12">
				<a href="/recipes/{recipe.id}" class="text-black"><div class="border p-8 border-black">{recipe.name}</div></a>
			</li>
		{/each}
	</ul>
</div>
