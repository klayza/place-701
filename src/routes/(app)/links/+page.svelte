<script>
    /** @type {import('./$types').PageData} */
    import links from '/src/lib/data/links.json';
    import { fade } from 'svelte/transition';
    
    const categories = links.reduce((acc, link) => {
        if (!acc[link.category]) acc[link.category] = [];
        acc[link.category].push(link);
        return acc;
    }, {});
    
    let currentCategory = null;
    let visibleLinks = links;
    
    // Generate random subtle colors for categories
    const categoryColors = Object.keys(categories).reduce((acc, category) => {
        // Generate random subtle colors
        const hue = Math.random() * 360;
        acc[category] = {
            text: `hsl(${hue}, 30%, 40%)`,
            bg: `hsl(${hue}, 20%, 95%)`
        };
        return acc;
    }, {});
    
    function toggleCategory(category) {
        if (currentCategory === category) {
            currentCategory = null;
            visibleLinks = links;
        } else {
            currentCategory = category;
            visibleLinks = links.filter(link => link.category === category);
        }
    }
</script>

<div class="px-4 sm:p-4 sm:pt-24 sm:pb-12 sm:max-w-screen-lg sm:m-auto">
    <h2 class="mt-8 mb-4 text-6xl">Links</h2>
    <p class="mb-8 font-medium text-xl sm:text-2xl">Some of my favorite sites around the net.</p>
    
    <div class="flex flex-row gap-2 mb-8">
        {#each Object.keys(categories) as category}
            <div 
                on:click={() => toggleCategory(category)} 
                class="flex-shrink-0 p-4 py-2 rounded-xl hover:cursor-pointer transition-all duration-200"
                style="
                    border: 2px {currentCategory === category ? 'solid' : 'dashed'} {currentCategory === category ? categoryColors[category].text : '#374151'};
                    color: {currentCategory === category ? categoryColors[category].text : 'inherit'};
                    background-color: {currentCategory === category ? categoryColors[category].bg : 'transparent'};
                "
            >
                <h3 class="text-xl font-medium">{category}</h3>
            </div>
        {/each}
    </div>

    <div class="flex flex-col gap-8 text-xl">
        {#each visibleLinks as link (link.url)}
            <div transition:fade={{ duration: 200 }}>
                <div class="hidden sm:block">
                    <div class="flex gap-4 items-center font-medium">
                        <a class="flex-shrink-0" href={link.url}>
                            <img src="/img/links/{new URL(link.url).hostname}.png" alt={link.title} class="w-24 sm:w-48 xl:w-64 h-auto" />
                        </a>
                        <div class="flex-grow">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" class="no-color">{link.title} →</a>
                            <hr class="mt-4" />
                            <p class="subtle">{link.description}</p>
                        </div>
                    </div>
                </div>
                <div class="block sm:hidden">
                    <div class="flex flex-col gap-4 items-center font-medium">
                        <a class="flex-shrink-0" href={link.url}>
                            <img src="/img/links/{new URL(link.url).hostname}.png" alt={link.title} class="w-full h-auto" />
                        </a>
                        <div class="flex-grow">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" class="no-color">{link.title} →</a>
                            <p class="subtle">{link.description}</p>
                        </div>
                        <hr class="mt-4" />
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>