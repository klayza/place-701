<script>
	const pages = [
		{ name: 'projects', url: '/projects', color: 'text-blue-400' },
		// { name: 'thoughts', url: '/thoughts', color: 'text-green-400' },
		{ name: 'links', url: '/links', color: 'text-red-400' },
		{ name: 'about', url: '/about', color: 'text-yellow-400' },
		{ name: 'travel', url: '/travel', color: 'text-purple-400' },
		{ name: 'todo', url: '/todo', color: 'text-pink-400' },
		{ name: 'reading', url: '/reading', color: 'text-cyan-400' },
	];
	let selected = '';
</script>

<header class="relative m-4 px-4 rounded-lg py-4 bg-gradient-to-b from-red-600 to-red-900 lg:px-8 lg:py-8 overflow-hidden max-h-screen">
	<div class="absolute inset-0 opacity-10">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
					<path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	</div>

	<div class="relative z-10">
		<div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
			<h1 class="text-3xl sm:text-4xl  text-white text-center">
				<a href="/" class="no-color text-white "> Clayton Wieberg </a>
			</h1>

			<nav class="flex flex-wrap justify-center gap-2 lg:gap-4">
				{#each pages as page}
					<a
						key={page.name}
						href={page.url}
						class={`px-3 py-2 text-xl font-medium rounded-md transition-colors
							hover:bg-white/10 text-white no-color  hover:{page.color}
							focus:outline-none focus:ring-2 focus:ring-white/20`}
					>
						{page.name}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</header>
