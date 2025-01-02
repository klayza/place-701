<script>
  export let backPath 
  export let title
  export let description
</script>

<a href="{backPath}" class="hidden sm:block absolute flex justify-center items-center top-30 sm:top-60 left-4 sm:left-8 py-2 px-4 no-color  shadow-md z-50">
	<i class="bx bx-arrow-back inline mr-2"></i>
	<span class="inline">Back</span>
</a>

<a href="{backPath}" class="block sm:hidden absolute flex justify-center items-center top-50 sm:top-80 left-1 sm:left-8 py-2 px-4 no-color  shadow-md z-50">
	<i class="bx bx-arrow-back inline mr-2 text-2xl"></i>
	<span class="inline font-medium">Back</span>
</a>


<div class="pt-12 pb-12">
	<h1 class="text-5xl sm:text-7xl  px-2 sm:px-0 text-center mt-6">{title}</h1>
	{#if description}
	<h1 class="text-xl text-center m-auto px-4 mt-12 max-w-4xl mb-4 font-medium">{description}</h1>
	{/if}
</div>
