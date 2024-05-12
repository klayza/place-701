<script>
	import Project from './Project.svelte';

	let projects = [
		{
			title: "Scholar's Quest",
			status: 'Active',
			tags: ['0 MRR', 'Indie dev']
		},
		{
			title: 'day2day',
			status: 'Active',
			tags: ['Open Source']
		}
	];
</script>

<div class="flex h-screen justify-center items-center"><p class="text-5xl text-center">UNDER CONSTRUCTION</p></div>

<!-- {#each projects as project }
<Project {...project}/>
{/each} -->
