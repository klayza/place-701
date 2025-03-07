<script>
	import { onMount } from 'svelte';

	const social = [
		{ name: 'github', username: 'klayza', url: 'https://github.com/klayza', icon: 'bxl-github' },
		{ name: 'linkedin', username: 'clayton-wieberg', url: 'https://www.linkedin.com/in/clayton-wieberg-31a148219', icon: 'bxl-linkedin' },
		{ name: 'twitter', username: 'LegoshiNet', url: 'https://twitter.com/LegoshiNet', icon: 'bxl-twitter' },
		{ name: 'instagram', username: 'clay.e621', url: 'https://www.instagram.com/clay.e621', icon: 'bxl-instagram' },
		{ name: 'email', username: 'cw1a@protonmail.com', url: 'mailto:cw1a@protonmail.com', icon: 'bx-mail-send' }
	];

	let canvas;
	let ctx;
	let grid = [];
	let nextGrid = [];
	let cellSize = 5;
	let fps = 5;
	let rows, cols;

	function initGrid() {
		rows = Math.ceil(canvas.height / cellSize);
		cols = Math.ceil(canvas.width / cellSize);

		grid = Array(rows)
			.fill()
			.map(() => Array(cols).fill(0));
		nextGrid = Array(rows)
			.fill()
			.map(() => Array(cols).fill(0));

		// Initialize with random cells
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				grid[i][j] = Math.random() > 0.9 ? 1 : 0;
			}
		}
	}

	function updateGrid() {
		// Cellular automata rules (Conway's Game of Life)
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let neighbors = countNeighbors(i, j);

				// Apply Conway's Game of Life rules
				if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
					nextGrid[i][j] = 0; // Dies
				} else if (grid[i][j] === 0 && neighbors === 3) {
					nextGrid[i][j] = 1; // Reproduction
				} else {
					nextGrid[i][j] = grid[i][j]; // Stays the same
				}
			}
		}

		// Swap grids
		[grid, nextGrid] = [nextGrid, grid];
	}

	function countNeighbors(row, col) {
		let count = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue;

				let r = (row + i + rows) % rows;
				let c = (col + j + cols) % cols;

				count += grid[r][c];
			}
		}
		return count;
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(255, 255, 255, .10)';

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				if (grid[i][j] === 1) {
					ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
				}
			}
		}
	}

	function animate() {
		draw();
		updateGrid();
		setTimeout(() => requestAnimationFrame(animate), 1000 / fps);
	}

	function handleResize() {
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		initGrid();
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		initGrid();
		animate();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<footer class="relative px-4 py-24 mt-24 border-t border-dashed border-gray-800">
	<canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>

	<div class="container mx-auto relative z-10">
		<div class="flex flex-wrap justify-center gap-6 md:gap-8">
			{#each social as { name, url, icon, username }}
				<a
					href={url}
					class="flex items-center gap-2 px-3 py-2 text-xl font-medium rounded-md transition-colors
							hover:bg-white/10 text-white no-color
							focus:outline-none focus:ring-2 focus:ring-white/20"
					aria-label={name}

				>
					<i class={`bx ${icon} text-2xl md:text-2xl`}></i>
					<span class="text-xl hidden md:block">{username}</span>
				</a>
			{/each}
		</div>

	</div>
	<div class="absolute bottom-4 left-1/2 -translate-x-1/2 mt-6 text-center text-xs text-zinc-800">
		© 2069 Clayton Wieberg
		<!-- © {new Date().getFullYear()} Clayton Wieberg -->
	</div>

</footer>
