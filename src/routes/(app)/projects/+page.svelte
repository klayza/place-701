<script>
  import { projects } from "$lib/data.js";
</script>

<div class="container mx-auto px-4 py-16">
  <h2 class="text-4xl font-bold text-center mb-16">Projects</h2>
  
  <div class="space-y-24">
    {#each projects as project}
      <div class="relative border-2 border-gray-200 p-8 transition-all hover:shadow-lg hover:border-gray-400">
        <a href={project.url} class="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
        
        <div class="mb-6">
          <h3 class="text-3xl font-semibold mb-2">{project.title}</h3>
          <p class="text-xl text-gray-600 italic mb-4">{project.description}</p>
          <div class="flex flex-wrap gap-4">
            {#each project.tags as tag}
              <span class="px-3 py-1 text-sm border border-gray-300 rounded-full">{tag}</span>
            {/each}
          </div>
        </div>
        
        <div class="flex gap-8 bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {#each project.images as image}
            <img src={image} alt={project.title} class="w-auto h-64 object-cover border-2 border-gray-300 rounded transition-transform hover:scale-105 hover:-translate-y-2 hover:rotate-1" />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>