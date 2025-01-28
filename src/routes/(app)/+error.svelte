<script>
	import { page } from '$app/stores';
    console.log($page)

    function getLastPage() {
        // Get the last page visited
        // ex. http://localhost:5173/travel/japan-2024 -> http://localhost:5173/travel
        let fullUrl = $page.url.href;
        let url = new URL(fullUrl);
        let path = url.pathname;
        let lastSlash = path.lastIndexOf('/');
        let lastPage = path.substring(0, lastSlash);
        return lastPage;

    }
</script>

<div class="container px-12 py-12">
	<h1 class="text-8xl">{$page.status}</h1>
	<h2 class="text-3xl">{$page.error.message}</h2>
    <p class="text-3xl  my-12">Shit happens. <a href="{getLastPage()}">Go back</a> to the last page</p>
</div>
