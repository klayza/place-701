<script>
  import { goto } from '$app/navigation';

  function goHome() {
    goto('/');
  }
</script>

<div class="construction-overlay">
  <div class="blurred-background"></div>
  <div class="message-container">
    <div class="construction-sign">
      <div class="sign-header">CAUTION</div>
      <p class="construction-message">Under Construction</p>
      <div class="sign-footer">WORK IN PROGRESS</div>
    </div>
    <button class="back-button" on:click={goHome}>Back to Home</button>
  </div>
  <!-- <div class="stop-signs">
    <div class="stop-sign">STOP</div>
    <div class="stop-sign">STOP</div>
    <div class="stop-sign">STOP</div>
  </div> -->
</div>

<style>
  .construction-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }

  .blurred-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(10px);
  }

  .message-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .construction-sign {
    background-color: #FFA500;
    border: 10px solid black;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }

  .sign-header, .sign-footer {
    background-color: black;
    color: #FFA500;
    padding: 10px;
    font-weight: bold;
    font-size: 2rem;
  }

  .construction-message {
    font-size: 6rem;
    color: black;
    font-weight: bold;
    text-transform: uppercase;
    margin: 20px 0;
  }

  .back-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .back-button:hover {
    background-color: #45a049;
  }

  .stop-signs {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .stop-sign {
    background-color: #FF0000;
    color: white;
    font-weight: bold;
    padding: 10px;
    border: 3px solid white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-5deg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .stop-sign:nth-child(2) {
    transform: rotate(5deg);
  }

  .stop-sign:nth-child(3) {
    transform: rotate(-3deg);
  }
</style>