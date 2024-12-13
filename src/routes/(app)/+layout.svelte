<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	onMount(() => {
		import('boxicons').then((boxicons) => {});
	});
</script>

<SEO />

<svelte:head>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</svelte:head>

<Navbar />
<slot />
