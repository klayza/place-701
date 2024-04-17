<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	onMount(() => {
    import('boxicons').then((boxicons) => {
    });
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
		// { name: 'travel', url: '/travel', type: 'normal' },
		{ name: 'links', url: '/links', type: 'normal' },
	];

	let hoveredItem = null;
	function showPreview(item) {
		hoveredItem = item;
	}
</script>

<svelte:head>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</svelte:head>

<header class="w-full border-b flex relative bg-white">
	
	<div class={hoveredItem && hoveredItem.type === 'expand' ? 'overlay show' : 'overlay'}></div>
	{#each items as item, index}
		<a
			href={item.url}
			class=" text-lg head-item p-6 border-r {item.type == 'primary' ? 'primary-logo w-1/3' : 'w-60'}"
			on:mouseenter={() => showPreview(item)}
			on:mouseleave={() => (hoveredItem = null)}
		>
			<div>
				<span class="uppercase">{item.name}</span>
				{#if item.type == 'expand'}
					<span class="expandable float-end text-2xl">+</span>
				{/if}
			</div>
		</a>
		{#if hoveredItem === item && item.type == 'expand'}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="preview-panel"
				on:mouseenter={() => showPreview(item)}
				on:mouseleave={() => (hoveredItem = null)}
			>
				{#if hoveredItem.name === 'projects'}
					<div class="flex flex-row justify-evenly p-3 tracking-widest uppercase">
						<a href="https://github.com/klayza" class="flex-1 text-center">
							<!-- <i class="fab fa-github"></i>  -->
							Total Stars: ⭐<span class="text-green-700">{hoveredItem.previewData.totalStars}</span
							></a
						>
						<a href="#" class="flex-1 text-center"
							>Total Users: <span class="text-green-700">{hoveredItem.previewData.totalUsers}</span
							></a
						>
						<a href="#" class="flex-1 text-center"
							>Total MRR: <span class="text-green-700">{hoveredItem.previewData.totalMRR}</span></a
						>
						<a href="#" class="flex-1 text-center"
							>Total Projects: <span class="text-green-700">3</span></a
						>
					</div>
					<div class="flex flex-row border-t">
						<div class="flex-1 border-r p-12 pt-4">
							<h1 class="text-2xl">Completed</h1>
							<li>
								<a>Scholar's Quest....2mo</a>
							</li>
						</div>
						<div class="flex-1 border-r p-12 pt-4"><h1 class="text-2xl">Completed</h1></div>
						<div class="flex-1 p-12 pt-4"><h1 class="text-2xl">Completed</h1></div>
					</div>
				{/if}
			</div>
		{/if}
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
		background-color: rgb(218, 218, 218);
		cursor: pointer;
	}

	.head-item:first-child {
		color: red;
	}
	.head-item a:first-child::before {
		/* content: ">_ "; */
		color: rgb(40, 40, 40);
		font-size: 1.2em;
	}

	.preview-panel {
		display: none; /* Hidden by default */
		position: absolute;
		width: 100%;
		top: 100%; /* Position just below the navbar */
		margin-top: 1px;
		box-shadow: 0 8px 6px -6px black; /* Example shadow for visibility */
		transition: opacity 0.5s ease; /* Smooth opacity transition */
		z-index: 10;
		/* background-color: black; */
		border-bottom: 1px solid var(--border-color);
	}
	

	.preview-panel::before {
		content: ''; /* Necessary for the pseudo-element to show */
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1; /* Behind the content of .preview-panel */
	}
	.head-item:hover + .preview-panel,
	.preview-panel:hover {
		display: block;
		opacity: 1; /* Make visible */
	}
	@keyframes rotatePlus {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(45deg);
		}
	}

	.expandable:hover {
		animation: rotatePlus 0.3s forwards;
	}
</style>
