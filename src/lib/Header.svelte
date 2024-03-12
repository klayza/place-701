<script>
  // export let items;
  let items = [
    {"name": "place-701", "url": "/app.html"}
  ]

</script>

<header class="w-full border border-b-black">
  {#each items as item}
    <a href="{item.url}">{item.name}</a>
  {/each}
</header>

<style>
</style>