<script>
	// @type {import('./$types').PageData}
	export let data;
	let email = '';
	let message = '';
	let messageType = ''; // 'success' or 'error'
	let showMessage = false;

	const { totalMdFiles, mostRecentModifiedDate, weekData } = data;
	function weekTitle(weekNum) {
		const week = weekData.find((w) => w.id == weekNum);
		if (!week) {
			return ' ';
		} else if (week.title) {
			return '' + week.title;
		} else {
			return ' ';
		}
	}
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	function weekCover(weekNum) {
		const week = weekData.find((w) => w.id == weekNum);
		return week?.cover || '';
	}

	async function submitEmail() {
		try {
			const response = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (response.ok) {
				message = data.message;
				messageType = 'success';
				email = ''; // Clear the input
			} else {
				message = data.error || 'Something went wrong';
				messageType = 'error';
			}
		} catch (err) {
			message = 'Network error';
			messageType = 'error';
		}

		showMessage = true;

		// Hide the message after a few seconds
		setTimeout(() => {
			showMessage = false;
		}, 3000);
	}
</script>

<!-- <a href="/travel" class="absolute top-20 sm:top-24 left-4 sm:left-8 py-2 px-4 bg-white hover:bg-slate-100 border rounded-md shadow-md z-50">
	<i class='bx bx-arrow-back inline mr-2'></i>
	<span class="inline">Back</span>
</a> -->



<div class="pt-12 pb-6">
	<h1 class="text-6xl sm:text-8xl  px-2 sm:px-0 text-center mt-6 uppercase">Pacific <br>West<br> Coast</h1>
	<p class="max-w-xl px-8 sm:text-2xl text-xl sm:max-w-7xl sm:my-24  m-auto font-medium my-8">4 months spent traveling the west coast in a camper van. From Arizona to L.A, <span class="text-red-200">San Francisco</span>, <span class="text-orange-100">Yosemite Park</span>, Seattle, until <span class="text-blue-100">Banff, Canada</span>.</p>    
</div>

<div class="max-w-screen-2xl mx-auto pt-0 py-12 px-4 sm:px-8">
	<p class="uppercase mt-6 text-right border-b border-dotted mb-2 font-medium text-gray-300">updated {formatDate(mostRecentModifiedDate)}</p>
	<!-- <div class="p-6 border my-4 rounded relative mt-4" role="alert">
		<strong class=""></strong>
		<span class="block sm:inline">Want to stay updated? Get emailed when I make a new post.</span>
		<div class="m-auto my-2 mb-0 flex-row flex relative">
			<input type="email" class="border px-2 bg-black text-white" placeholder="Enter your email" bind:value={email} />
			<button class="uppercase bg-red-700 text-white border px-4 py-2" on:click={submitEmail}>Submit</button>

			{#if showMessage}
					<p class="py-2 ml-4 border-b bg-gray-100 px-3 {`notification ${messageType} show`}">{message}</p>
			{/if}
		</div>
	</div>
 -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 ">
		{#each Array(totalMdFiles).reverse() as _, i}
			<a href="/travel/west-coast-2024/w{totalMdFiles - i}" class="block overflow-hidden group relative rounded-lg h-40 sm:h-96 no-color static-link">
				<div class="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style="background-image: url({weekCover(totalMdFiles - i)});">
					<div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
				</div>
				<div class="relative h-full flex flex-col justify-center items-center text-white">
					<h2 class="text-4xl text-center line-clamp-3 text-shadow">{weekTitle(totalMdFiles - i)}</h2>
					<p class="text-xl absolute bottom-2 mx-auto font-medium  mb-2 shadow-md  text-white px-4 rounded-full  ">Week {totalMdFiles - i}</p>
				</div>
				<!-- <div class="text-lg font-medium sm:text-2xl flex-row flex gap-4 absolute bottom-2 m-auto  mb-2 text-shadow ">
					<p class="">{weekTitle(totalMdFiles - i)}</p>
				</div> -->

			</a>
		{/each}
	</div>
</div>

<style>
	.text-shadow {
		text-shadow:
			1px 1px 2px rgba(0, 0, 0, 0.5),
			0 0 1px rgba(0, 0, 0, 0.5);
	}

	/* .notification {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
    bottom: 0;
		margin: auto;
		text-align: center;
		transition: top 0.5s;
    border: 1px solid;
	} */

	.notification.success {
		/* background-color: rgb(0, 211, 0); */
    color: green;
	}

	.notification.error {
		/* background-color: red; */
		color: red;
	}

	.notification.show {
		top: 0;
	}
</style>
