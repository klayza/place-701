<script>
  export let title = "Default Title";
  export let description = "Default description of the page.";
  export let url = "https://example.com";
  export let image = "https://example.com/default-image.jpg";
</script>

<div class="preview-container">
  <h2>Search Engine Preview</h2>
  <div class="search-preview">
    <div class="search-title">{title}</div>
    <div class="search-url">{url}</div>
    <div class="search-description">{description}</div>
  </div>

  <h2>Social Media Preview</h2>
  <div class="social-preview">
    <img src={image} alt="Preview image" class="social-image"/>
    <div class="social-content">
      <div class="social-title">{title}</div>
      <div class="social-description">{description}</div>
      <div class="social-url">{url}</div>
    </div>
  </div>
</div>

<style>
  .preview-container {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .search-preview, .social-preview {
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 20px;
  }
  .search-title {
    color: #1a0dab;
    font-size: 18px;
    margin-bottom: 5px;
  }
  .search-url {
    color: #006621;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .search-description {
    color: #545454;
    font-size: 14px;
  }
  .social-preview {
    display: flex;
    flex-direction: column;
  }
  .social-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  .social-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .social-description {
    font-size: 14px;
    color: #606770;
    margin-bottom: 5px;
  }
  .social-url {
    font-size: 14px;
    color: #606770;
    text-transform: uppercase;
  }
</style>