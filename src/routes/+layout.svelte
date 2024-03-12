<script>
	import '../app.css';

	let items = [
		{ name: 'place-701', url: '/' },
		{ name: 'projects', url: '/projects' },
		{ name: 'thoughts', url: '/thoughts' },
		{ name: 'travel', url: '/travel' },
	];
</script>

<header class="w-full border-b flex">
	{#each items as item}
		<a
			class="uppercase p-5 pr-20 border-r"
			href={item.url}>{item.name}</a
		>
	{/each}
</header>

<slot />
