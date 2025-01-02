<script>
	import { onMount } from 'svelte';
	import LifeWeekGrid from './LifeWeekGrid.svelte';

	let age = 20;
	let ageDeath = 70;
	let socialMediaHours = 4;
	let sleep = 8;
	let work = 8;
	let chores = 2;
	let variableTotal = 0;

	$: weeksRemain = ageDeath * 52 - age * 52 - variableTotal;

	function calculateWeeks(hours, special = null) {
		let subtractor = 0;
		if (special == 'work') {
			subtractor = 52 * (ageDeath - 55); // retirement ~ 15 yrs
		}
		return Math.round((hours * 7 * 52 * (ageDeath - age)) / 24) - subtractor;
	}

	$: basicVariables = [{ label: 'Social Media', color: 'bg-red-500', weeks: calculateWeeks(socialMediaHours) }];

	$: advancedVariables = [
		{ label: 'Social Media', color: 'bg-red-500', weeks: calculateWeeks(socialMediaHours) },
		{ label: 'Sleep', color: 'bg-black', weeks: calculateWeeks(sleep) },
		{ label: 'Work', color: 'bg-yellow-300', weeks: calculateWeeks(work) },
		{ label: 'Chores', color: 'bg-blue-300', weeks: calculateWeeks(chores) }
	];
</script>

<p class="mb-16">Below is your entire life in weeks. Each box represents 1 week. Assuming the average lifespan of 70 years, everyone starts off with 3,640 weeks to do as they please. However, we are becoming more and more distracted in a world where attention is as valuable as gold, so it's easy to lose track.</p>

<p class="mb-4">Try it out by typing your age and time you spend using social media.</p>

<div class="flex flex-wrap gap-2 mb-8">
	<div class="flex items-center">
		<label for="age" class="mr-2">I am</label>
		<input id="age" type="number" bind:value={age} min="0" max="70" class="w-16 p-1 border " />
		<span class="ml-2">years old and</span>
	</div>
	<div class="flex items-center">
		<label for="social-media-hours" class="mr-2">I use social media</label>
		<input id="social-media-hours" type="number" bind:value={socialMediaHours} min="0" max="24" class="w-16 p-1 border " />
		<span class="ml-2">hours a day</span>
	</div>
</div>

<div class="bg-blue-100 border border-blue-300 rounded p-4 mb-6">
	<p>You have {weeksRemain} weeks left.</p>
	<p>Your social media usage is taking {calculateWeeks(socialMediaHours)} weeks from your life.</p>
</div>

<LifeWeekGrid {age} {ageDeath} variables={basicVariables} />

<p class="my-48">Now you might be thinking that you can live with the few hours you spend online looking at funny videos, it's only a small fraction of all the future boxes after all. But that would be wrong. The first grid is only the most conservative. Factors like sleep, work, and chores are all unaccounted for. Let's see what it looks like with these factors added.</p>

<div class="flex flex-wrap gap-2 mb-8">
	<div class="flex items-center">
		<label for="sleep" class="mr-2">I sleep</label>
		<input id="sleep" type="number" bind:value={sleep} min="0" max="12" class="w-16 p-1 border " />
		<span class="ml-2">hours a night.</span>
	</div>
	<div class="flex items-center">
		<label for="work" class="mr-2">I work </label>
		<input id="work" type="number" bind:value={work} min="0" max="12" class="w-16 p-1 border " />
		<span class="ml-2">hours a day.</span>
	</div>
	<div class="flex items-center">
		<label for="chores" class="mr-2">I spend </label>
		<input id="chores" type="number" bind:value={chores} min="0" max="12" class="w-16 p-1 border " />
		<span class="ml-2">hours doing chores like cleaning, commuting, or cooking.</span>
	</div>
</div>

<div class="bg-blue-100 border border-blue-300 rounded p-4 mb-6">
	<p>You will sleep for {calculateWeeks(sleep)} more weeks.</p>
	<br />
	<p>{weeksRemain - calculateWeeks(sleep) - calculateWeeks(socialMediaHours) - calculateWeeks(work) - calculateWeeks(chores)} weeks remain. ({Math.floor(((weeksRemain - calculateWeeks(sleep) - calculateWeeks(socialMediaHours) - calculateWeeks(work) - calculateWeeks(chores)) / (ageDeath * 52)) * 100)}% of life left)</p>
</div>

<LifeWeekGrid {age} {ageDeath} variables={advancedVariables} />

<p class="mt-12">It's slightly unsettling watching the percent tick up</p>

