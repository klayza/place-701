<script>
	/** @type {import('./$types').PageData} */
	export let data;

	let links = [
	{
		url: 'https://projects.kwon.nyc/internet-is-fun/',
		name: 'Internet is Fun',
		description: 'A directory of fun websites'
	},
	{
		url: 'https://brianlovin.com/bookmarks/',
		name: 'Brian Lovin Bookmarks',
		description: 'A collection of curated bookmarks and resources'
	},
	{
		url: 'https://www.susanrigetti.com/',
		name: 'Susan Rigetti',
		description: 'Personal website of Susan Rigetti, a writer and entrepreneur'
	},
	{
		url: 'https://monogram.io/',
		name: 'Monogram',
		description: 'A design and development studio creating digital products'
	},
	{
		url: 'https://www.daniel.pizza/',
		name: "Daniel's Pizza",
		description: 'A personal website and blog of Daniel, a developer and designer'
	},
	{
		url: 'https://www.lesswrong.com/',
		name: 'LessWrong',
		description: 'A community-driven wiki and forum focused on rational thinking and decision-making'
	},
	{
		url: 'https://www.jonway.studio/',
		name: 'Jonway Studio',
		description: 'A design studio creating interactive experiences and digital products'
	},
	{
		url: 'https://sarahdrasnerdesign.com/projects/',
		name: "Sarah Drasner's Projects",
		description: 'A showcase of projects and experiments by Sarah Drasner, a developer and designer'
	},
	{
		url: 'https://sissonsrowe.com/',
		name: 'Sissons+Rowe',
		description: 'Good design'
	},
	{
		url: 'https://andymatuschak.org/',
		name: 'Andy Matuschak',
		description: 'Personal website of Andy Matuschak, a researcher and writer on topics like education and technology'
	},
	{
		url: 'https://gracekind.net/',
		name: 'Gracekind',
		description: 'A personal site of an AI researcher that has a substantial repository on Ideonomy'
	},
	{
		url: 'https://www.extropic.ai/',
		name: 'Extropic',
		description: 'Futuristic + Minimal themed website'
	},
	{
		url: 'https://100r.co/',
		name: '100r',
		description: 'Futuristic + Minimal themed website'
	},
	{
		url: 'https://localadventurer.com/',
		name: 'Local Adventurer',
		description: 'Well documented and thoughtful guides of sites to see'
	},
	{
		url: 'https://redwoodhikes.com/',
		name: 'David Redwood Hikes',
		description: 'A taleted writer and experienced hiker\' collection of best spots to hike in the redwood forest'
	},
	{
		url: 'https://immieats.com',
		name: 'Immieats',
		description: 'An instant-ramen delivery service with good design'
	}
];</script>

<main class="border-x w-full m-auto 2xl:w-9/12 h-screen">
	<div
		class="w-full p-12 pl-8 border-b tracking-widest"
		style="background-image: linear-gradient(to right, rgb(255, 230, 255), white, white);"
	>
		<p class="uppercase text-3xl inline-block mr-8">links</p>
	</div>

	<div class="mx-12 w-fit grid p-3">
		{#each links as link}
			<li class="group opacity-80">
				<a
					class="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out list-none text-xl"
					href={link.url}>{link.name}</a
				> {@html link.description ? `<i class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white"> ` + link.description + `</i>` : ""}
			</li>
		{/each}
	</div>
			</main>

<style>
	.w-fit.grid.p-3 li {
		list-style: square; /* change bullet points to square */
		padding: 5px; /* add adequate padding */
	}

	.m-auto.w-fit.grid.p-3 a {
		text-decoration: none; /* remove link coloring */
		color: #3498db; /* set a default color, you can change this to your preference */
		transition: color 0.2s ease; /* add a subtle hover effect */
	}

	.m-auto.w-fit.grid.p-3 a:hover {
		color: #2ecc71; /* change color on hover, you can change this to your preference */
	}

	main::before {
		background-color: black !important;
	}
</style>


