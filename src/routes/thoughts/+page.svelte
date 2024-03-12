<script>
	/** @type {import('./$types').PageData} */
	const mode = 'light';
</script>

<!-- <div class="w-full p-6 pl-8 text-2xl border-b uppercase tracking-widest" style="background-image: url('https://github.com/klayza/HTML-Projects/blob/main/Secondary/assets/city.png?raw=true'); background-position: center;">projects</div> -->
<main class="flex flex-row light-mode-{mode}">
	<section class="border-r basis-1/4 flex flex-col">
		<div class="border-b flex-1 bottom-0">
			<h1 class="text-2xl p-3 uppercase text-center">Latest Posts</h1>
		</div>
		<div class="border-b flex-1"></div>
	</section>
	<section class="border-r basis-3/4 flex flex-col">
		<div class="thought-post border-b p-6 pb-16 pt-3 h-fit fit relative">
			<span class="text-xl">12th February, 2024</span>
			<h1 class="text-3xl mt-16 ml-6">What will be our next biggest discovery?</h1>
			<p class="ml-6 mt-6 mb-16 max-w-2xl">
				One of the most remarkable achievements I have witnessed is the realization and adoption of
				intelligent machines.
			</p>
			<ul class="flex flex-row justify-start absolute bottom-6 text-black left-6 gap-3">
				<li class="uppercase p-1 mt-3 border text-sm bg-blue-200">thought experiment</li>
				<li class="uppercase p-1 mt-3 border text-sm bg-red-200">existentialism</li>
				<li class="uppercase p-1 mt-3 border text-sm bg-yellow-200">fundamentalism</li>
			</ul>
			<span class="text-sm text-gray-500 absolute bottom-6 right-6">0.2204310W' 1.2000124N'</span>
		</div>
	</section>
</main>

<style>
	main {
		height: 100vh;
	}

	.light-mode-light {
		background-color: white;
		color: black;
	}

	.light-mode-dark {
		background-color: black;
		color: white;
	}

	.thought-post:hover {
		box-shadow: -5px 0px 0px 5px;
		transition: box-shadow 0.5s ease;
		cursor: pointer;
	}
</style>
