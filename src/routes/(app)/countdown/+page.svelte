<script lang="ts">
	import ArticleBody from '$lib/components/ArticleBody.svelte';
	const countdownDate = new Date('2024-12-05T00:00:00.000Z');

	let timeLeft = calculateTimeLeft();

	// Set an interval to update the time every second
	const interval = setInterval(() => {
		timeLeft = calculateTimeLeft();
		if (timeLeft.total <= 0) {
			clearInterval(interval);
		}
	}, 1000);

	function calculateTimeLeft() {
		const now = new Date().getTime();
		const difference = countdownDate.getTime() - now;

		if (difference > 0) {
			return {
				total: difference,
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((difference % (1000 * 60)) / 1000)
			};
		} else {
			return {
				total: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			};
		}
	}
</script>

<ArticleBody showNavigation={false}>
	<h1 class="text-2xl mt-0 sm:text-5xl font-bold">Beastars Season 3 Finale</h1>
	<p class="text-xl sm:text-4xl font-normal text-center text-red-600">{timeLeft.days} days : {timeLeft.hours} hours : {timeLeft.minutes} min : {timeLeft.seconds} sec</p>
	<img src="https://a.storyblok.com/f/178900/1500x2222/096f63177c/beastars-final-season-teaser-visual-english.jpeg/m/filters:quality(95)format(webp)" />
</ArticleBody>
