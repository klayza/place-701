<script>
	// import { marked } from 'marked';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<body>
	<div class="bg relative bg-no-repeat" style="background-image: url('/img/clouds.png')">
		<h1 class="absolute" style="z-index: 100;">What you think is what you become.</h1>
		<span class="absolute bottom-0 bg-below w-full bg-black text-blue-100"> - Buddha</span>
	</div>
	<!-- <div class="gradien t-descent bg-gradient-to-b from-transparent to-white h-24"></div> -->
	<div class="bg-white p-12 flex-col gap-10">
		<p class="max-w-6xl text-black text-2xl m-auto mt-96 leading-10">
			<span class="first-letter mr-1">L</span>ong ago when humanity was still playing in the mud,
			not worrying if their spiced latte was accidentaly made with whole milk instead of soy milk,
			or what events the people on the magical metal rectancles are saying... one of these primal
			humans had an interesting thought. They imagined a sprawling, golden meadow, rich with
			wildberries, rabbits, deer, and any other food they could possibly imagine. Their siblings
			were far too occupied with foraging wild berries across the river rapids
		</p>

		<p class="max-w-6xl text-black text-2xl m-auto my-30 leading-10">
			This vision stayed with the primal human, shaping their actions. While others scavenged for
			sustenance, accepting the day's yield as it came, this human learned to chip stones into crude
			tools. At first, it was met with laughter. Was this worth skipping a meal for? But soon, a
			sharpened stick made spearfishing easier, and a rudimentary basket aided berry collection. The
			laughter faded, replaced by wide eyes and requests for help crafting similar devices.
		</p>

		<p class="max-w-6xl text-black text-2xl m-auto my-30 leading-10">
			Slowly, with each new idea, the human felt the tug of that golden meadow. They spent less time
			simply surviving, and more on making tools. They envisioned huts to shelter them from storms,
			and their siblings, seeing the comfort, abandoned their caves. It was hard work, the doubts of
			others a constant background noise, but every success proved another step closer to their
			imagined paradise.
		</p>

		<p class="max-w-6xl text-black text-2xl m-auto my-30 leading-10">
			Then, there was fire. That primal human, staring at the flames, saw not just warmth or cooked
			meat, but a spark of the meadow they carried inside. Fire bent the world to their will! Trees
			became homes, clay became pots that didn't leak, the night became less fearful. Their
			siblings, initially wary by the changes, were now awestruck. Here was a person not content
			with mere existence, but who dared claim the world could bow to their imagined reality.
		</p>

		<p class="max-w-6xl text-black text-2xl m-auto my-96 leading-10">
			What started as a single human sucking at merely getting by, ignited the very essence of human
			progress. From the first crude ax to sprawling cities, what makes civilization itself possible
			is the belief that things *don't* have to be the way they are. This is the gift of sucking —
			the restlessness, the dissatisfaction that makes us build our own golden meadows, one
			invention at a time.
		</p>
	</div>

	<div class="absolute border-none top-0 bottom-0 w-full h-full -z-3 flex flex-row">
		<div class="basis-1/3 h-full border-r border-gray-600"></div>
		<div class="basis-1/3 h-full border-r border-gray-600"></div>
		<div class="basis-1/3 h-full"></div>
	</div>
</body>

<style>
	h1 {
		font-size: 10vw;
	}

	.first-letter {
		font-size: 5em;
		/* line-height: 10em; */
	}

	span {
		font-family: Ultra;
		text-shadow: 1px 1px 0px black;
		font-size: 6vw;
	}

	.bg {
		width: 99vw;
		height: 90vh;
	}

	.bg-below {
		height: 10vh;
	}
</style>
