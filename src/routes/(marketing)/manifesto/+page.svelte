<script>
	// import { marked } from 'marked';
	/** @type {import('./$types').PageData} */
</script>

<body>
	<div class="bg-container">
		<div class="quote-container">
			<div class="quote">What you think is what you become.</div>
			<div class="author">- Buddha</div>
		</div>
		<div class="gradient-overlay"></div>
		<div class="scroll-indicator">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12 5v14M19 12l-7 7-7-7" />
			</svg>
		</div>
	</div>
	<div class="essay sm:max-w-screen-lg px-4 m-auto text-xl">
		<p class="mt-20">
			<span class="first-letter mr-1">L</span>ong ago when humanity was still playing in the mud, not worrying if their spiced latte was accidentaly made with whole milk instead of soy milk, or what events the people on the magical metal rectancles are saying... one of these primal humans had an interesting thought. They imagined a sprawling, golden meadow, rich with wildberries, rabbits, deer, and any other food they could possibly imagine. Their siblings were far too occupied with foraging wild berries across the river rapids.
		</p>

		<p>This vision stayed with the primal human, shaping their actions. While others scavenged for sustenance, accepting the day's yield as it came, this human learned to chip stones into crude tools. At first, it was met with laughter. Was this worth skipping a meal for? But soon, a sharpened stick made spearfishing easier, and a rudimentary basket aided berry collection. The laughter faded, replaced by wide eyes and requests for help crafting similar devices.</p>

		<p>Slowly, with each new idea, the human felt the tug of that golden meadow. They spent less time simply surviving, and more on making tools. They envisioned huts to shelter them from storms, and their siblings, seeing the comfort, abandoned their caves. It was hard work, the doubts of others a constant background noise, but every success proved another step closer to their imagined paradise.</p>

		<p>Then, there was fire. That primal human, staring at the flames, saw not just warmth or cooked meat, but a spark of the meadow they carried inside. Fire bent the world to their will! Trees became homes, clay became pots that didn't leak, the night became less fearful. Their siblings, initially wary by the changes, were now awestruck. Here was a person not content with mere existence, but who dared claim the world could bow to their imagined reality.</p>

		<p>
			What started as a single human sucking at merely getting by, ignited the very essence of human progress. From the first crude ax to sprawling cities, what makes civilization itself possible is the belief that things <i>don't</i> have to be the way they are. This is the gift of sucking — the restlessness, the dissatisfaction that makes us build our own golden meadows, one invention at a time.
		</p>
	</div>
	<p class="m-auto my-10 leading-10 text-center">
		<a href="/" class="w-full m-auto text-xl hover:underline">Return</a>
	</p>
</body>

<style>
	body,
	html {
		margin: 0;
		padding: 0;
		height: 100%;
		background-color: black;
		color: white;
		/* font-family: Arial, sans-serif; */
	}
	p {
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.bg-container {
		background-image: url('/img/clouds.png');
		background-size: cover;
		background-position: center;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
	}
	.gradient-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 200px;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgb(0, 0, 0) 100%);
	}
	.quote-container {
		text-align: center;
		color: #333;
		padding: 20px;
		z-index: 10;
	}
	.quote {
		font-size: 5vw;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.author {
		font-size: 3vw;
		font-style: italic;
	}

	.essay {
		/* font-size: 18px; */
	}
	.scroll-indicator {
		position: absolute;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.7);
		animation: bounce 2s infinite;
		z-index: 20;
	}

	@media (max-width: 768px) {
		.quote {
			font-size: 8vw;
		}
		.author {
			font-size: 5vw;
		}
	}
</style>
