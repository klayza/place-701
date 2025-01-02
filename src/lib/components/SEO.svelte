<script>
	import { page } from '$app/stores';

	// export let title = 'Clayton Wieberg';
	// export let description = 'Software engineer, independent student, and entrepreneur. I write about AI, automation, philosophy, and improving life with software.';
	// export let keywords = 'software engineering, AI, automation, philosophy, entrepreneurship';
	// export let image = '/favicon.png';
	// export let card = '/img/think.jpg';

	export let title;
	export let description;
	export let keywords;
	export let image;
	export let card;

	title = title || 'Clayton Wieberg';
	description = description || 'Software engineer, independent student, and entrepreneur. I write about AI, automation, philosophy, and improving life with software.';
	keywords = keywords || 'software engineering, AI, automation, philosophy, entrepreneurship';
	image = image || '/favicon.png';
	card = card || '/img/think.jpg';

	// Use a reactive statement to derive the URL dynamically
	$: url = $page.url.href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content={card} />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />
</svelte:head>
