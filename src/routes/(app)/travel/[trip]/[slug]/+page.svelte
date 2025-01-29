<script>
    /** @type {{ data: import('./$types').PageData }} */
    import Article from '$lib/components/Article.svelte';
    export let data;
    let thisEntry = data.trip.entries.find(entry => entry.id == data.slug);
    let relativeImgDir=`/data/trips/${data.trip.id}/attachments`
</script>

<Article title={thisEntry.title} description="" backPath="/travel/{data.trip.id}" mdPath="/data/trips/{data.trip.id}/w{data.slug}.md" relativeImgDir={relativeImgDir} />


