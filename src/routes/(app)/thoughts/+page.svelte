<script>
	/** @type {import('./$types').PageData} */
	const mode = 'light';
	let posts = [
		{
			id: 'next-discovery',
			title: 'Next Discoveries',
			snippet: 'What will be our next biggest discovery?',
			date: '3/12/2024',
			tags: ['thought experiment', 'existentialism', 'fundamentalism'],
			img: 'img/next-discovery.png'
		},
		{
			id: 'next-discovery',
			title: 'Cars Politics',
			snippet:
				'Cars, the movie had to be one of the most existentially horiffic movies I have ever watched',
			date: '1/12/2024',
			tags: ['movie', 'existentialism', 'fundamentalism'],
			img: 'img/cars-politics.png'
		},
		{
			id: 'next-discovery',
			title: 'Homo Sapien History',
			snippet:
				'One of the most remarkable achievements I have witnessed is the realization and adoption of intelligent machines.',
			date: '3/12/2023',
			tags: ['rainbow', 'clayton', 'deez nutz', 'yoyoyoyoyoyoyoyoyoyoyo'],
			img: 'img/primitives.png'
		},
	];

	function tagColorGen(tag) {
		let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
		let r = 100;
		let g = 100;
		let b = 100;
		let point = 20;

		for (let i = 0; i < tag.length; i++) {
			let letter = tag[i];
			let letterIndex = alphabet.indexOf(letter);

			// Determine which third of the alphabet the letter falls in
			if (letterIndex < alphabet.length / 3) {
				r += point;
			} else if (letterIndex < (alphabet.length * 2) / 3) {
				g += point;
			} else {
				b += point;
			}
		}

		return `rgb(${r}, ${g}, ${b});`;
	}

	function dateToElapsed(dateStr) {
		const date = new Date(dateStr);
		const currentDate = new Date();
		const diffTime = Math.abs(currentDate - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays + 'd';
		if (diffDays < 30) {
			return `${diffDays}d`;
		} else if (diffDays < 365) {
			const diffMonths = Math.floor(diffDays / 30);
			return `${diffMonths}mo`;
		} else {
			const diffYears = Math.floor(diffDays / 365);
			return `${diffYears}y`;
		}
	}

	function genPeriods(post) {
		let periods = '...';
		// Calculate the length of the elapsed time string for the current post
		const currentPostElapsedLength = dateToElapsed(post.date).toString().length;
		// Find the maximum length of elapsed time string among all posts
		const greatestElapsedLength = posts.reduce((max, p) => {
			const elapsedLength = dateToElapsed(p.date).toString().length;
			return elapsedLength > max ? elapsedLength : max;
		}, 0);

		// Calculate how many periods to append based on the difference
		const diff = greatestElapsedLength - currentPostElapsedLength;
		periods += '.'.repeat(diff); // Append additional periods to equalize the length
		return periods;
	}

	function prettyDate(dateStr) {
		const [month, day, year] = dateStr.split('/');
		return new Date(year, month - 1, day).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function elapsedDaysColor(date) {
		let elapsed = dateToElapsed(date); // Assuming this returns something like "5 days"
		let days = parseInt(elapsed.split(' ')[0]);
		if (!isNaN(days) && days < 7) {
			return 'rgb(200, 255, 200)';
		}
		return null; // Default case, you might want to handle differently
	}
</script>

<div class="w-full p-12 pl-8 border-b tracking-widest">
	<p class="uppercase text-3xl inline-block mr-8">thoughts</p>
</div>
<!-- <div class="w-full p-4 pl-8 text-2xl  bg-gray-200 uppercase tracking-widest"><p>/ thoughts / recent</p></div> -->
<!-- <div class="latest border-b flex flex-row">
		<div class="flex w-full flex-col">
			<a href="/thoughts/next-discovery"><p class="text-center m-auto text-4xl hover:text-blue-800  pt-12 pb-12">I shoved a fork up my ass</p></a>
			<p class="mt-12 mt-6 text-2xl italic text-center">March 26th, 2024</p>
			<p class="mt-12 text-2xl ">What are some of the side effects to having a rusty fork splender the confines of your bum?</p>
		</div>
		<div class="flex w-2/3 p-8">
			<img src="img/clouds.png" class="h-full w-auto" />
		</div>
	</div> -->
<div class="w-full p-4 pl-8 text-2xl bg-gray-200 uppercase tracking-widest">
	<p>/ thoughts / all</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-8 lg:grid-cols-4 gap-8">
	{#each posts as post}
		<div class="border p-4 flex flex-col">
			<div class="mb-3 text-lg">
				<p class="text-left inline">[{posts.indexOf(post) + 1}]</p>
				<p class=" inline">{prettyDate(post.date)}</p>
			</div>
			<img
				src={post.img ? post.img : 'img/clouds.png'}
				alt="Post Image"
				class="w-600 h-600 object-cover mb-2"
			/>
			<p class="text-lg my-6 font-semibold">{post.title}</p>
			<p class="text-lg">{post.snippet}</p>
		</div>
	{/each}
</div>

<!-- <main class="flex flex-row light-mode-{mode}"> -->
<!-- <section class="border-r basis-1/4 flex flex-col">
		<div class="border-b flex flex-1 flex-col">
			<h1 class="text-2xl p-3 uppercase text-center border-b">Latest Posts</h1>
			<ul class="latest-posts p-6 mx-auto">
				{#each posts as post}
					<li class="truncate text-right m-2">
						<a href="/thoughts/{post.id}" class="inline-block w-full">
							{post.title}{genPeriods(post)}
							{dateToElapsed(post.date)}
						</a> 
					</li>
				{/each}
			</ul>
		</div>
	</section> -->
<!-- <section class="border-r basis-3/4 flex flex-col">
		{#each posts as post}
			<a href="{'/thoughts/'+post.id}">
			<div class="thought-post border-b p-6 pb-16 pt-3 h-fit fit relative">
				<span class="text-xl">{post.date}</span>
				<h1 class="text-3xl w-fit mt-16 ml-6">{post.title}</h1>
				<p class="ml-6 mt-6 mb-16 max-w-2xl">
					{post.snippet}
				</p>
				<ul class="flex flex-row justify-start absolute bottom-6 text-black left-6 gap-3">
					{#each post.tags as tag}
						<li
							class="uppercase p-1 mt-3 border text-sm"
							style="background-color: {tagColorGen(tag)}"
						>
							{tag}
						</li>
					{/each}
				</ul>
				<span class="text-sm text-gray-500 absolute bottom-6 right-6">0.2204310W' 1.2000124N'</span>
			</div>
			</a>
		{/each}
	</section> -->
<!-- </main>
 -->

<style>
	main {
		height: 100vh;
	}

	.light-mode-light {
		background-color: white;
		color: black;
	}

	.light-mode-dark {
		background-color: black;
		color: white;
	}

	.thought-post:hover {
		/* box-shadow: 0px 2px 0px 0px; */
		/* transition: box-shadow 0.5s ease; */
	}

	.thought-post h1:hover {
		cursor: pointer;
		text-decoration: underline;
	}

	.latest-posts li:hover {
		/* transition: border-bottom 0.5s ease; */
		/* border-bottom: 1px solid; */
		box-shadow: 0 0 0 1px black;
	}
</style>
