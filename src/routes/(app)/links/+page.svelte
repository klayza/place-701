<script>
	/** @type {import('./$types').PageData} */
	export let data;

	let links = [
		{
			url: 'https://projects.kwon.nyc/internet-is-fun/',
			name: 'Internet is Fun'
		},
		{
			url: 'https://brianlovin.com/bookmarks/',
			name: 'Brian Lovin Bookmarks'
		},
		{
			url: 'https://www.susanrigetti.com/',
			name: 'Susan Rigetti'
		},
		{
			url: 'https://monogram.io/',
			name: 'Monogram'
		},
		{
			url: 'https://www.daniel.pizza/',
			name: "Daniel's Pizza"
		},
		{
			url: 'https://www.lesswrong.com/',
			name: 'LessWrong'
		},
		{
			url: 'https://www.jonway.studio/',
			name: 'Jonway Studio'
		},
		{
			url: 'https://sarahdrasnerdesign.com/projects/',
			name: "Sarah Drasner's Projects"
		},
		{
			url: 'https://sarahdrasnerdesign.com/projects/',
			name: "Sarah Drasner's Projects"
		},
		{
			url: "https://immieats.com",
			name: "Immieats"
		}
	];
</script>

<div class="m-auto w-fit grid p-3">
	{#each links as link}
		<li><a class="text-blue-200 w-fit" href={link.url}>{link.name}</a></li>
	{/each}
</div>
