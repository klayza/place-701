<script>
  import { projects } from "$lib/data.js";
</script>

<div class="container mx-auto px-4 py-16">
  <h2 class="text-4xl font-bold text-center mb-16">Projects</h2>
  
  <div class="space-y-24">
    {#each projects as project}
      <div class="relative border-2 border-gray-200 p-8 transition-all ">
        <a href={project.url} class="absolute top-8 right-4 transition-opacity group-hover:opacity-100">
          <!-- <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg> -->
					<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:2em;height:2em;" data-new="" aria-hidden="true" data-v-67d7128c="">
						<polygon fill="black" points="5 4.31 5 5.69 9.33 5.69 2.51 12.51 3.49 13.49 10.31 6.67 10.31 11 11.69 11 11.69 4.31 5 4.31" data-v-67d7128c=""></polygon>
					</svg>
				</a>
        
        <div class="mb-6">
          <h3 class="text-3xl font-semibold mb-2">{project.title}</h3>
          <p class="text-xl text-gray-600 italic mb-4">{project.description}</p>
          <div class="flex flex-wrap gap-4">
            {#each project.tags as tag}
              <span class="px-4 py-2 text-base border border-gray-300 {tag === 'Open Source' ? 'text-yellow-600 border-yellow-400' : ''}">
                {tag}
              </span>
            {/each}
          </div>
        </div>
        
        <div class="m-auto max-w-4xl overflow-x-auto">
          <div class="flex gap-8 p-4 rounded-lg bg-white bg-opacity-50 border" style="background-image: linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px); background-size: 20px 20px;">
            {#each project.images as image}
              <img src={image} alt={project.title} class="w-auto h-64 object-cover border-2 border-gray-300 rounded transition-transform hover:scale-105 hover:-translate-y-2 hover:rotate-1" />
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>



