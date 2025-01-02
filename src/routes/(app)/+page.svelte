<script>
  import { onMount } from 'svelte';
  
  let age_years;
  const dob = new Date('11/26/2003');
  
  onMount(() => {
    age_years = calculateAge(dob);
  });

  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
</script>

<div class="min-h-screen bg-black text-white">
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-16">
    <section class="mb-32">
      <h2 class=" text-4xl mb-6">Who are you?</h2>
      <p class="font-medium text-xl leading-relaxed max-w-3xl">
        A programmer, student, and entrepreneur. I live abroad and like making cool things on the internet. I write about AI, automation, philosophy, and improving life with software. 
        <a href="/about" class="no-color">Read more</a>
      </p>
    </section>

    <section>
      <h2 class=" text-4xl mb-6">What have you done?</h2>
      <p class="font-medium text-xl leading-relaxed max-w-3xl">
        I've started a few businesses, failed, traveled the pacific west coast out of a camper van, made a few robots, learned Japanese, made a few websites, became an eagle scout.
      </p>
    </section>
  </main>
</div>

<style>
  /* :global(body) {
    margin: 0;
    background-color: black;
    color: white;
  }

  :global(*) {
    font-family: 'Pixelfy Sans', sans-serif;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: 'Pirata One', cursive;
  } */
</style>