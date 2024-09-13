<script>
	import { onMount } from 'svelte';
  import UCPage from '$lib/components/UnderConstructionPage.svelte'
  // import UnderConstructionPage from '../../../lib/components/UnderConstructionPage.svelte';

	// Project data (unchanged)
	const projects = [
		{
			id: 'scholars-quest',
			title: "Scholar's Quest",
			url: 'https://github.com/example/scholars-quest',
			image: '/img/sq-land.png',
			current: true
		},
		{
			id: 'physarum',
			title: 'Physarum',
			url: 'https://github.com/example/physarum',
			image: '/img/projects/physarum.png',
			current: true
		},
		{
			id: 'day2day',
			title: 'day2day',
			url: 'https://github.com/klayza/day2day',
			image: 'https://github.com/klayza/day2day/raw/main/assets/habittracker.png',
			current: true
		},
		{
			id: 'simple-instagram',
			title: 'Simple Instagram',
			url: 'https://github.com/klayza/simple-instagram',
			image: '/img/projects/simple-instagram.png',
			current: false
		}
	];

	// Smooth scroll function (unchanged)
	function scrollToProject(id) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	// Add smooth scrolling behavior (unchanged)
	onMount(() => {
		const links = document.querySelectorAll('.project-link a');
		links.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const id = e.target.getAttribute('href').slice(1);
				scrollToProject(id);
			});
		});
	});
</script>
<UCPage></UCPage>
<div class="w-full p-8 pl-8 border-b tracking-widest" style="background-image: linear-gradient(to right, rgb(255, 255, 100), white, white, white, white);">
	<p class="uppercase text-3xl inline-block mr-8">projects</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 text-xl gap-12 m-8 mr-8 w-full h-[calc(100vh-242px)]">
	<!-- Left Column (lc) -->
	<div class="lc p-16 hidden sm:block border rounded-3xl w-full h-full overflow-y-auto scrollable">
		<div class="grid grid-cols-2 grid-rows-2 gap-8">
			<div class="">
				<p class="bg-yellow-200 px-3 ml-1 my-2 mb-4 w-fit">Current</p>
				<ol class="ml-10 pl-4" style="list-style-type: decimal-leading-zero;">
					{#each projects.filter((p) => p.current) as project, index}
						<li class="project-link">
							<a href="#{project.id}" class=" hover:text-blue-300 text-black flex items-center w-fit">
								<span class="mr-2 -z-20">{project.title}</span>
								<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:1em;height:1em;" aria-hidden="true" class="inline-block">
									<polygon fill="black" points="5 4.31 5 5.69 9.33 5.69 2.51 12.51 3.49 13.49 10.31 6.67 10.31 11 11.69 11 11.69 4.31 5 4.31"></polygon>
								</svg>
							</a>
						</li>
					{/each}
				</ol>
			</div>
      <div class="">
        <p class="bg-yellow-200 px-3 ml-1 my-2 mb-4  w-fit">Past</p>
        <ol class="ml-10 pl-4" style="list-style-type: decimal-leading-zero;">
          {#each projects.filter((p) => !p.current) as project, index}
            <li class="project-link">
              <a href="#{project.id}" class=" hover:text-blue-300 text-black flex items-center w-fit">
                <span class="mr-2 -z-20">{project.title}</span>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:1em;height:1em;" aria-hidden="true" class="inline-block">
                  <polygon fill="black" points="5 4.31 5 5.69 9.33 5.69 2.51 12.51 3.49 13.49 10.31 6.67 10.31 11 11.69 11 11.69 4.31 5 4.31"></polygon>
                </svg>
              </a>
            </li>
          {/each}
        </ol>
      </div>
      <div class="">
        <p class="bg-yellow-200 px-3 ml-1 my-2 mb-4 w-fit">Failed</p>
        <ol class="ml-10 pl-4" style="list-style-type: decimal-leading-zero;">
          {#each projects.filter((p) => !p.current) as project, index}
            <li class="project-link">
              <a href="#{project.id}" class=" hover:text-blue-300 text-black flex items-center w-fit">
                <span class="mr-2 -z-20">{project.title}</span>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:1em;height:1em;" aria-hidden="true" class="inline-block">
                  <polygon fill="black" points="5 4.31 5 5.69 9.33 5.69 2.51 12.51 3.49 13.49 10.31 6.67 10.31 11 11.69 11 11.69 4.31 5 4.31"></polygon>
                </svg>
              </a>
            </li>
          {/each}
        </ol>
      </div>
      <div class="">
        <p class="bg-yellow-200 px-3 ml-1 my-2 mb-4  w-fit">Ideas</p>
        <ol class="ml-10 pl-4" style="list-style-type: decimal-leading-zero;">
          {#each projects.filter((p) => !p.current) as project, index}
            <li class="project-link">
              <a href="#{project.id}" class=" hover:text-blue-300 text-black flex items-center w-fit">
                <span class="mr-2 -z-20">{project.title}</span>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:1em;height:1em;" aria-hidden="true" class="inline-block">
                  <polygon fill="black" points="5 4.31 5 5.69 9.33 5.69 2.51 12.51 3.49 13.49 10.31 6.67 10.31 11 11.69 11 11.69 4.31 5 4.31"></polygon>
                </svg>
              </a>
            </li>
          {/each}
        </ol>
      </div>
		</div>
	</div>

	<!-- Right Column (rc) - unchanged -->
	<div class="rc pr-16 rounded-2xl w-full h-full overflow-y-auto scrollable">
		<div class="flex flex-col gap-8">
			{#each projects as project}
				<div id={project.id} class="block">
					<a href={project.url} target="_blank" rel="noopener noreferrer" class="block">
						<div class="p-4 border rounded-3xl w-full">
							<img src={project.image} class="w-full h-auto rounded-2xl object-contain" alt="{project.title} Project Image" />
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	* {
		font-family: 'Space Mono', monospace;
	}
	li::marker {
		margin-right: 10px;
		color: rgb(155, 155, 155);
	}
	li {
		line-height: 35px;
		color: black;
	}
	.scrollable {
		scrollbar-width: thin;
		scrollbar-color: #888 #f1f1f1;
	}
	.scrollable::-webkit-scrollbar {
		width: 6px;
	}
	.scrollable::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	.scrollable::-webkit-scrollbar-thumb {
		background: #888;
	}
	.scrollable::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
