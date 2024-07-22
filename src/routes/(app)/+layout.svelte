<script>
	import '../../app.css';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  onMount(() => {
    import('boxicons').then((boxicons) => {});
  });

  let items = [
    { name: 'place-701', url: '/', type: 'primary' },
    {
      name: 'projects',
      url: '/projects',
      type: 'normal',
      previewData: { totalStars: 28429, totalUsers: 1, totalMRR: 0 }
    },
    { name: 'thoughts', url: '/thoughts', type: 'normal' },
    { name: 'links', url: '/links', type: 'normal' }
  ];

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<svelte:head>
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
</svelte:head>

<header class="w-full border-b flex justify-between items-center relative bg-white">
  <a href="/" class="text-md sm:text-xl head-item p-4 sm:p-6 primary-logo">
    <div class="logo">
      <span class="uppercase text-xl">place-701</span>
    </div>
  </a>
  <!-- <a href="/" class="text-md sm:text-xl head-item p-4 sm:p-6">
    <div>
      <span class="text-black text-xl">Clayton Wieberg</span>
    </div>
  </a> -->
  <button class="sm:hidden p-4" on:click={toggleMenu}>
    <i class="bx bx-menu text-2xl"></i>
  </button>
  <nav class="hidden sm:flex flex-grow justify-end">
    {#each items.slice(1) as item}
      <a href={item.url} class="text-md sm:text-lg head-item p-4 sm:p-6 border-r">
        <div>
          <span class="uppercase">{item.name}</span>
        </div>
      </a>
    {/each}
  </nav>
</header>

{#if isMenuOpen}
  <div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col" transition:fade="{{ duration: 300 }}">
    <div class="flex justify-end p-4">
      <button on:click={toggleMenu} class="text-white">
        <i class="bx bx-x text-3xl"></i>
      </button>
    </div>
    <nav class="flex flex-col items-center justify-center flex-grow">
      {#each items.slice(1) as item}
        <a href={item.url} class="text-white text-2xl py-4" on:click={toggleMenu}>
          <span class="uppercase">{item.name}</span>
        </a>
      {/each}
    </nav>
  </div>
{/if}

<slot />

<style>
  :global(body) {
    --border-color: #e2e8f0;
  }
  
  a {
    color: black;
  }
  
  header {
    border-color: var(--border-color);
  }
  
  .head-item {
    border-color: var(--border-color);
    transition:
      background-color 0.4s ease,
      color 0.3s ease;
  }
  
  .head-item:hover {
    background-color: rgb(0, 0, 0);
    cursor: pointer;
    color: rgb(255, 0, 0);
  }
  
  .primary-logo {
    font-family: 'Major Mono Display', monospace;
    position: relative;
    overflow: hidden;
  }
  
  .logo {
    display: inline-block;
    position: relative;
  }
  
  .logo::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: red;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .primary-logo:hover .logo::after {
    transform: translateX(0);
  }
  
  @media (max-width: 640px) {
    .primary-logo {
      border-right: none;
    }
  }
</style>