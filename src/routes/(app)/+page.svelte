<script>
	let dob = new Date('11/26/2003');
	let age_years = new Date(new Date() - dob).getFullYear() - 1970;
	let places = [{}];
	let intro = `I'm a software engineer, lifelong student, and entrepreneur. I live abroad and make cool
					things on the internet. I write about AI, automation, philosophy, and improving life with
					software.`;

</script>

<div class="intro inline-flex gap-20 z-5 relative pb-24 px-20">
	<div class="intro-left m-auto">
		<div class="intro-name leading-none mt-24 mb-10 text-6xl tracking-widest p-5">
			Welcome. This is the website of Clayton Wieberg.
		</div>
		<div class="below-intro flex flex-row gap-10">
			<div class="typewrite-container mt-10 p-5 mb-20 text-2xl basis-2/3">
				<p class="typewrite-text" style="--n:{intro.length}">
					{intro}
				</p>
			</div>
			<div class="basis-1/3">
				<img src="/img/boulder.jpg" />
				<p class="italic text-gray-800">
					If you recognize this image, then you are in the right place.
				</p>
			</div>
		</div>
		<!-- <div class="intro-desc inline-flex gap-10 ml-10">
			<li class="text-3xl ml-2.5">Software Engineer</li>
			<li class="text-3xl ml-7">Student</li>
			<li class="text-3xl ml-7">Entrepreneur</li>
		</div> -->
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
	</div>
</div>

<!-- 		
	<a href="/gallery"><div class="bg-black text-xl text-white p-4 px-12">Gallery</div></a>
		<a href="/chill"><div class="bg-black text-xl text-white p-4 px-12">Chill</div></a>
		<a href="/contact"><div class="bg-black text-xl text-white p-4 px-12">Contact</div></a>
		<a href="/manifesto"><div class="bg-black text-xl text-white p-4 px-12">Manifesto</div></a>
 -->

<div class="px-20">
	<div class="flex flex-row gap-16 p-10">
		<div>
			<h2 class="text-3xl mb-4 border p-2 ">Artifiicial Intelligence</h2>
			<ul class="">
				<li style="list-style-type-square">Robot evolution</li>
				<li>Nanobot existential risk worth it?</li>
			</ul>
		</div>
		<div>
			<h2 class="text-3xl mb-4 border p-2">Self-Improvement</h2>
			<div class="flex flex-col">
				<span>Robot evolution</span>
				<span>Nanobot existential risk worth it?</span>
			</div>
		</div>
	</div>
</div>

<!-- <style>
	.intro-name {
		color: rgb(100, 100, 100);
		font-size: 4vw;
		font-style: italic;
		top: 0px;
		font-weight: bolder;
		letter-spacing: 5px;
		padding: 20px 0px 20px 0px;
		color: red;
		margin-top: 100px;
	}

	.intro-desc {
		display: inline-flex;
	}

	.intro-desc li {
		text-align: justify;
		font-size: 1.8vw;
		max-width: 80%;
		color: white;
		list-style-type: square;
	}

	.intro-desc li:not(:first-child) {
		margin-left: 30px;
	}

	.intro-desc li:first-child {
		list-style-type: none;
		margin-left: 10px;
	}

	.intro {
		width: 100%;
		display: inline-flex;
		gap: 20px;
		background: linear-gradient(to bottom, rgb(27, 27, 27), black, black, black, black);
		/* background-image: url('https://files.oaiusercontent.com/file-VANEyPraZ0V704uKWgYQb5o6?se=2024-02-19T02%3A21%3A08Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D31ed5061-4c00-4ec3-8196-9262e2d90f40.webp&sig=GTb/dCv8XA5J0aDYM7jQADs/07uGKTJN8VbakCEIJWI%3D'); */
		z-index: 5;
		/* margin-bottom: 100px; */
		padding-bottom: 100px;
		position: relative;
	}

	.intro-left {
		margin: 20px auto;
	}

	.intro-intro {
		margin-top: 10px;
		/* border-top: 1px dashed rgb(54, 54, 54); */
		padding: 20px 10px;
		/* text-align: justify; */
		max-width: 60vw;
		letter-spacing: 1.5px;
		font-size: 1.2vw;
		font-style: italic;
		color: rgb(211, 211, 211);
	}

	.intro-intro p {
		/* font-family: Ultra; */
	}

	* {
		font-family: Space Mono;
	}
</style> -->

<!-- <div class="absolute flex top-0 h-full w-full flex-row -z-10">
	<div class="basis-1/3 flex border-r"></div>
	<div class="basis-1/3 flex border-r"></div>
	<div class="basis-1/3 flex"></div>
</div> -->

<!-- <div class="gridlines absolute flex top-0 h-full w-full flex-col -z-10" style="border-left: 30px solid; border-right: 30px solid; border-color: black; ">
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-10"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-10"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-8"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-8"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-10"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-10"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-14"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-14"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-10"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-10"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-8"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-8"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-10"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-10"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-14"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-14"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-10"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-10"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-8"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-8"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-10"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-10"></span></div>
	<div class="basis-1/3 flex flex-row"><span class="border-b basis-14"></span><span class="border-b-white grow basis-2/3"></span><span class="border-b basis-14"></span></div>
</div> -->

<style>
</style>
