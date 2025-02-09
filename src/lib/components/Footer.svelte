<script>
	import HelloButton from '$lib/components/HelloButton.svelte';
	const social = [
		{ name: 'github', username: 'klayza', url: 'https://github.com/klayza', icon: 'bxl-github' },
		{ name: 'linkedin', username: 'clayton-wieberg', url: 'https://www.linkedin.com/in/clayton-wieberg-31a148219', icon: 'bxl-linkedin' },
		{ name: 'twitter', username: 'LegoshiNet', url: 'https://twitter.com/LegoshiNet', icon: 'bxl-twitter' },
		{ name: 'instagram', username: 'clay.e621', url: 'https://www.instagram.com/clay.e621', icon: 'bxl-instagram' },
		{ name: 'email', username: 'cw1a@protonmail.com', url: 'mailto:cw1a@protonmail.com', icon: 'bx-mail-send' }
	];
</script>


<HelloButton />
<footer class="relative px-4 border-dashed border-yellow-900 border-y-8 py-12 sm:px-16 sm:py-18 my-2 mt-[10vh]">
    <div class="absolute inset-0 opacity-30">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
                    <path d="M 200 0 L 0 0 0 200" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
    <div class="flex flex-row justify-center lg:flex-row lg:items-center relative gap-6 lg:gap-8 z-10">
        {#each social as { name, url, icon, username }}
            <a key={name} href={url} class="text-white no-color inline">
                <div class="flex flex-row items-center justify-center gap-2">
                    <i class={`bx ${icon} text-3xl text-white`}></i>
                    <span class="hidden font-medium sm:block inline">{username}</span>
                </div>
            </a>
        {/each}
    </div>
</footer>
<!-- 
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
 -->
