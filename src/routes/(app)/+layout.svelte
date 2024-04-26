<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	onMount(() => {
		import('boxicons').then((boxicons) => {});
	});

	let items = [
		{ name: 'place-701', url: '/', type: 'primary' },
		{
			name: 'projects',
			url: '/projects',
			type: 'normal',
			previewData: { totalStars: 28429, totalUsers: 1, totalMRR: 0 }
		},
		{ name: 'thoughts', url: '/thoughts', type: 'normal' },
		{ name: 'links', url: '/links', type: 'normal' }
	];
</script>

<svelte:head>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</svelte:head>

<header class="w-full border-b flex relative bg-white">
	{#each items as item, index}
		<a
			href={item.url}
			class=" text-lg head-item p-6 border-r {item.type == 'primary'
				? 'primary-logo w-1/3'
				: 'w-60'}"
		>
			<div>
				<span class="uppercase">{item.name}</span>
			</div>
		</a>
	{/each}
</header>
<slot />

<style>
	header {
		border-color: var(--border-color);
	}

	.head-item {
		border-color: var(--border-color);
		transition:
			background-color 0.4s ease,
			color 0.3s ease;
	}

	.head-item:hover {
		background-color: rgb(247, 248, 255);
		cursor: pointer;
		color: rgb(255, 0, 132);
	}

	.head-item:first-child {
		color: red;
	}
	.head-item a:first-child::before {
		/* content: ">_ "; */
		color: rgb(40, 40, 40);
		font-size: 1.2em;
	}
</style>
