<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Random Continents with Navigator</title>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #111;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="map"></canvas>

  <script>
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 500;

    const continents = [];
    const discoveredContinents = new Set();
    const dot = { x: Math.random() * canvas.width, y: Math.random() * canvas.height, speed: 1 };

    // Function to create random continents
    function generateContinents(count, vertexCount) {
      for (let i = 0; i < count; i++) {
        const vertices = [];
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const radius = 50 + Math.random() * 100;

        for (let j = 0; j < vertexCount; j++) {
          const angle = (Math.PI * 2 * j) / vertexCount;
          const x = centerX + Math.cos(angle) * (radius + Math.random() * 30);
          const y = centerY + Math.sin(angle) * (radius + Math.random() * 30);
          vertices.push({ x, y });
        }
        continents.push(vertices);
      }
    }

    // Draw all continents
    function drawContinents() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;

      continents.forEach((vertices, index) => {
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);

        for (let i = 1; i < vertices.length; i++) {
          ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
        ctx.stroke();

        if (discoveredContinents.has(index)) {
          const flagX = vertices[0].x;
          const flagY = vertices[0].y;
          ctx.font = '20px Arial';
          ctx.fillStyle = '#0f0';
          ctx.fillText('🏁', flagX - 10, flagY + 10);
        }
      });
    }

    // Find the nearest undiscovered continent
    function findNearestContinent() {
      let nearest = null;
      let minDistance = Infinity;

      continents.forEach((vertices, index) => {
        if (discoveredContinents.has(index)) return;
        const dx = vertices[0].x - dot.x;
        const dy = vertices[0].y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          minDistance = distance;
          nearest = { index, target: vertices[0] };
        }
      });

      return nearest;
    }

    // Move the dot towards the target
    function moveToTarget(target) {
      const dx = target.x - dot.x;
      const dy = target.y - dot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 1) return true;

      dot.x += (dx / distance) * dot.speed;
      dot.y += (dy / distance) * dot.speed;
      return false;
    }

    // Draw the dot
    function drawDot() {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f00';
      ctx.fill();
      ctx.closePath();
    }

    // Main animation loop
    let target = findNearestContinent();

    function animate() {
      drawContinents();

      if (target) {
        if (moveToTarget(target.target)) {
          discoveredContinents.add(target.index);
          target = findNearestContinent();
        }
      }

      drawDot();
      requestAnimationFrame(animate);
    }

    // Initialize and start
    generateContinents(5, 8);
    animate();
  </script>
</body>
</html>
