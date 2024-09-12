<!-- src/routes/admin/+page.svelte -->
<script>
  let password = '';
  let message = '';
  async function sendEmails() {
      const formData = new FormData();
      formData.append('password', password);
      const res = await fetch('/admin', {
          method: 'POST',
          body: formData
      });
      const result = await res.json();
      if (result.success) {
          message = 'Emails sent successfully!';
      } else {
          message = 'Failed to send emails.';
      }
  }
</script>

<input type="password" bind:value={password} placeholder="Enter Admin Password">
<button on:click={sendEmails}>Send Emails</button>
<p>{message}</p>
