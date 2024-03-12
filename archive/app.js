const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const ctx = canvas.getContext('2d');
console.log(ctx)

// Dimensions
const width = canvas.width;
const height = canvas.height;
// Number of arrows
const numArrows = 100;

// Define colors
const colors = ['white', 'rgb(200, 200, 255)', 'purple'];
// const colors = ['red', 'green', 'blue'];

class Arrow {
  constructor(x, y, angle, speed, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.color = color;
  }

  update() {
    this.angle = 1;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Wrap around the screen
    if (this.x < 0) this.x += width;
    else if (this.x > width) this.x -= width;
    if (this.y < 0) this.y += height;
    else if (this.y > height) this.y -= height;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x, this.y);
    const dx = Math.cos(this.angle) * 10;
    const dy = Math.sin(this.angle) * 10;
    ctx.lineTo(this.x + dx, this.y + dy);
    ctx.stroke();
  }
}

const arrows = [];

for (let i = 0; i < numArrows; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 4;
  const color = colors[Math.floor(Math.random() * colors.length)];
  arrows.push(new Arrow(x, y, angle, speed, color));
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (const arrow of arrows) {
    arrow.update();
    arrow.draw();
  }

  requestAnimationFrame(animate);
}

animate();

document.querySelector("#light-toggle").addEventListener("click", function() {
  const currentTheme = document.body.getAttribute("data-theme");
  let newTheme;
  if (currentTheme === "dark") {
    newTheme = "light";
    setTheme("light");
    document.body.setAttribute("data-theme", "light");
  } else {
    newTheme = "dark";
    setTheme("dark");
    document.body.setAttribute("data-theme", "dark");
  }
});

function setTheme(theme) {
  const elements = [
    {
      selector: ".nav span, .nav, .intro-desc li, .intro-intro p, .big-text *, .project-title, .meta-item",
      css: theme === "light" ? "color: black;" : "color: white;"
    },
    {
      selector: "canvas, .projects-container, .projects, .nav",
      css: theme === "light" ? "background-color: white;" : "background-color: black;"
    },
    {
      selector: ".intro",
      css: theme === "light" ? "border-bottom: 1px solid black;" : "border-bottom: 1px solid white;"
    },
    {
      selector: ".nav",
      css: theme === "light" ? "border-bottom-color: black;" : "border-bottom-color: white;"
    },
    {
      selector: ".project-desc",
      css: theme === "light" ? "color: rgb(20, 20, 20);" : "color: white;"
    },
    {
      selector: ".project-item",
      css: theme === "light" ? "border-color: rgb(200, 200, 200);" : "border-color: white;"
    },
  ];

  elements.forEach(el => {
    document.querySelectorAll(el.selector).forEach(element => {
      // Append new styles instead of overwriting existing ones
      element.style.cssText += el.css;
    });
  });
}

// setTheme("light")