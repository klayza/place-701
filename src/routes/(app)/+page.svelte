<script>
	import { onMount } from 'svelte';

	let dob = new Date('11/26/2003');
	let age_years;
	let intro = `I'm a software engineer, lifelong student, and entrepreneur. I live abroad and make cool
				things on the internet. I write about AI, automation, philosophy, and improving life with
				software.`;

	// Calculate age based on current date
	function calculateAge(birthDate) {
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	onMount(() => {
		age_years = calculateAge(dob);
	});
</script>

<div class="intro inline-flex gap-20 z-5 relative pb-24 px-20">
	<div class="intro-left m-auto">
		<h1 class="text-6xl p-5 mt-24 mb-10 leading-none">
			Welcome. This is the website of Clayton Wieberg.
		</h1>
		<div class="below-intro flex flex-row gap-10 mt-10">
			<div class="typewrite-container mb-20 p-5 text-2xl flex-grow">
				<p>{intro}</p>
			</div>
			<div>
				<img src="/img/boulder.jpg" alt="Boulder" />
				<p class="italic text-gray-800">
					If you recognize this image, then you are in the right place.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="places px-20">
	<h1 class="text-5xl pb-2">Places</h1>
	<hr />
	<div class="places-grid flex flex-row gap-8 my-10 p-10">
		<!-- <a href="/music"><div class="bg-black text-xl text-white p-8 px-24"><i class='bx bx-music'></i><p>Music</p></div></a> -->
		<a href="/music"><div class="bg-black text-xl text-white p-4 px-12"><p>Music</p></div></a>
		<a href="/travel"><div class="bg-black text-xl text-white p-4 px-12">Travel</div></a>
		<a href="/gallery"><div class="bg-black text-xl text-white p-4 px-12">Gallery</div></a>
		<a href="/chill"><div class="bg-black text-xl text-white p-4 px-12">Chill</div></a>
		<a href="/contact"><div class="bg-black text-xl text-white p-4 px-12">Contact</div></a>
		<a href="/manifesto"><div class="bg-black text-xl text-white p-4 px-12">Manifesto</div></a>
		<a href="/books"><div class="bg-black text-xl text-white p-4 px-12">Books</div></a>
	</div>
</div>

<div class="px-20">
	<div class="flex flex-row gap-16 p-10">
		<div>
			<h2 class="text-3xl mb-4 border p-2">Artificial Intelligence</h2>
			<ul>
				<li style="list-style-type: square;">Robot evolution</li>
				<li>Nanobot existential risk worth it?</li>
			</ul>
		</div>
		<div>
			<h2 class="text-3xl mb-4 border p-2">Self-Improvement</h2>
			<ul>
				<li>Robot evolution</li>
				<li>Nanobot existential risk worth it?</li>
			</ul>
		</div>
	</div>
</div>


<!-- <style>
.place-item::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    pointer-events: none;
  }</style> -->