<script>
	import '../../app.css';
	/** @type {import('./$types').LayoutData} */
	import { onMount } from 'svelte';
	onMount(() => {
    import('boxicons').then((boxicons) => {
    });
  });
</script>

<svelte:head>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</svelte:head>


<slot />
