<script>
	/** @type {import('./$types').PageData} */
	import { links } from '$lib/data.js';
</script>

<!-- <main class="border-x w-full m-auto 2xl:w-9/12 h-screen"> -->
<div class="w-full p-12 pl-8 border-b tracking-widest" style="background-image: linear-gradient(to right, rgb(255, 230, 255), white, white);">
	<h2 class="uppercase text-3xl inline-block mr-8">links</h2>
</div>


<div class="p-8 gap-8 sm:p-4m-2 pt-12 pb-20 sm:pt-24 text-xl sm:max-w-4xl ">
	<ul class="">
		{#each links as link}
			<li class="border-b border-black mt-12">
				<a class="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out list-none text-xl sm:text-2xl flex" href={link.url}><div>{link.name} →</div></a>
				<!-- {@html link.description ? `<i class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white"> ` + link.description + `</i>` : ''} -->
			</li>
			<p class="text-sm sm:text-lg">{link.description}</p>
		{/each}
	</ul>
</div>

<!-- <div class="mx-12 w-fit grid p-3">
	{#each links as link}
		<li class="group opacity-80">
			<a class="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out list-none text-xl" href={link.url}>{link.name}</a>
			{@html link.description ? `<i class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white"> ` + link.description + `</i>` : ''}
		</li>
	{/each}
</div> -->

<!-- </main> -->

<style>
	.w-fit.grid.p-3 li {
		list-style: square; /* change bullet points to square */
		padding: 5px; /* add adequate padding */
	}

	.m-auto.w-fit.grid.p-3 a {
		text-decoration: none; /* remove link coloring */
		color: #3498db; /* set a default color, you can change this to your preference */
		transition: color 0.2s ease; /* add a subtle hover effect */
	}

	.m-auto.w-fit.grid.p-3 a:hover {
		color: #2ecc71; /* change color on hover, you can change this to your preference */
	}

	main::before {
		background-color: black !important;
	}
</style>
