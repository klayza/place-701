<script>
	import { fade } from 'svelte/transition';
	let items = [
		{ name: 'place-701', url: '/', type: 'primary' },
		{
			name: 'projects',
			url: '/projects',
			type: 'normal',
			previewData: { totalStars: 28429, totalUsers: 1, totalMRR: 0 }
		},
		{ name: 'thoughts', url: '/thoughts', type: 'normal' },
		{ name: 'links', url: '/links', type: 'normal' },
		{ name: 'about', url: '/about', type: 'normal' }
	];

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="w-full border-b flex justify-between items-center relative">
	<a href="/" class="m-2 ml-6">
		<div>
			<span class="uppercase text-xl"><img src="/favicon.png" alt="logo" class="h-12 w-auto" /></span>
		</div>
	</a>
	<button class="sm:hidden p-4" on:click={toggleMenu}>
		<i class="bx bx-menu text-2xl"></i>
	</button>
	<nav class="hidden sm:flex flex-grow justify-end">
		{#each items.slice(1) as item}
			<a href={item.url} class="hover:text-red-500 text-md sm:text-lg head-item p-4 sm:p-6">
				<div>
					<span class="capitalize">{item.name}</span>
				</div>
			</a>
		{/each}
	</nav>
</header>

{#if isMenuOpen}
	<div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col" transition:fade={{ duration: 300 }}>
		<div class="flex justify-end p-4">
			<button on:click={toggleMenu} class="text-white">
				<i class="bx bx-x text-3xl"></i>
			</button>
		</div>
		<nav class="flex flex-col items-center justify-center flex-grow">
			{#each items.slice(1) as item}
				<a href={item.url} class="text-white text-2xl py-4" on:click={toggleMenu}>
					<span class="uppercase">{item.name}</span>
				</a>
			{/each}
		</nav>
	</div>
{/if}

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
		background-color: rgb(0, 0, 0);
		cursor: pointer;
		color: rgb(255, 0, 0);
	}
</style>
