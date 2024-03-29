<script>
	let dob = new Date('11/26/2003');
	let age_years = new Date(new Date() - dob).getFullYear() - 1970;
</script>

<div class="intro inline-flex gap-5 z-5 relative pb-24 px-20">
	<div class="intro-left m-auto">
		<div
			class="intro-name text-red-100 italic font-bold leading-none mt-24 text-4xl tracking-widest p-5"
		>
			Clayton Wieberg
		</div>
		<div class="intro-desc inline-flex">
			<li class="text-white text-lg ml-2.5">Software Engineer</li>
			<li class="text-white text-lg ml-7 list-square">Student</li>
			<li class="text-white text-lg ml-7 list-square">Entrepreneur</li>
		</div>
		<div class="intro-intro mt-2.5 p-5 max-w-60vw tracking-wide text-lg italic text-gray-300">
			<p>
				My name's Clay and I'm a {age_years} year old software engineer. I live abroad and make cool
				things on the internet. I'm into AI, automation, philosophy, and improving life with software.
			</p>
		</div>
	</div>
</div>

<!-- <div class="absolute flex top-0 h-full w-full flex-row -z-10">
	<div class="basis-1/3 flex border-r"></div>
	<div class="basis-1/3 flex border-r"></div>
	<div class="basis-1/3 flex"></div>
</div> -->

<div class="gridlines absolute flex top-0 h-full w-full flex-col -z-10" style="border: 30px solid; border-color: black">
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
</div>

<style>
	.gridlines > div {
		border-color: aliceblue;
	}

	.intro-name {
		font-size: 4vw;
	}
	.intro-name::before {
		content: '> ';
		color: green;
	}

	.intro-desc li {
		font-size: 1.8vw;
	}

	.intro-intro {
		font-size: 1.2vw;
	}

</style>

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


