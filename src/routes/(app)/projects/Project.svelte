<script>
  export let title;
  export let status;
  export let tags;
  export let url;
  export let embedData;
</script>

<div class='project'>
  <h2>{title}</h2>
  <h4>{status}</h4>
  <ul>
    {@html tags.map(tag => `<li>${tag}</li>`).join('')}
  </ul>
</div>

<style>
  .project {
    border: 1px solid;
    padding: 10px;
    margin-top: 10px;
    width: 50%;
  }
</style>