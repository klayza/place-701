<script>
	import { books } from '$lib/data.js';
	import { ArrowUpRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const monthly_book_goal = 1;
	let books_left_to_read = 0;
	let days_until_next_month = 0;
	let show_penalty_message = false;
	let penalty_amount = 0;
	let books_read_this_month = 0;
	let books_read_this_month_list = getBooksReadThisMonth();
	let books_read_last_month = calculateBooksReadLastMonth();
	let message_color = calculateMessageColor();

	function calculateMessageColor() {
		if (books_left_to_read == 0) {
			return 'green';
		} else if (books_left_to_read > 0 && !show_penalty_message) {
			return 'blue';
		} else if (show_penalty_message) {
			return 'red';
		}
	}

	function calculateDaysUntilNextMonth() {
		const today = new Date();
		const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
		return Math.ceil((nextMonth - today) / (1000 * 60 * 60 * 24));
	}

	function calculateBooksReadLastMonth() {
		const today = new Date();
		const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
		return books.filter((book) => {
			const endDate = new Date(book.end);
			return endDate >= lastMonth && endDate < today;
		}).length;
	}

	function getBooksReadThisMonth() {
		const today = new Date();
		const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
		const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
		return books.filter((book) => {
			const endDate = new Date(book.end);
			return endDate >= currentMonthStart && endDate < nextMonthStart;
		});
	}

	function calculateBooksReadThisMonth() {
		return getBooksReadThisMonth().length;
	}

	function getUniqueYears(books) {
		return [
			...new Set(
				books
					.filter((book) => book.end) // Filter out books without end dates
					.map((book) => {
						try {
							const endDate = new Date(book.end);
							if (isNaN(endDate.getTime())) return null;
							return endDate.getFullYear();
						} catch {
							return null;
						}
					})
					.filter((year) => year !== null) // Remove any null values
			)
		].sort((a, b) => b - a); // Sort years in descending order
	}

	function sortBooksByFinishDate(books) {
		return [...books]
			.filter((book) => book.end) // Only include books with end dates
			.sort((a, b) => {
				try {
					const dateA = new Date(a.end);
					const dateB = new Date(b.end);
					// Check if either date is invalid
					if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
					return dateB - dateA;
				} catch {
					return 0;
				}
			});
	}

	function updateReadingStatus() {
		const booksReadLastMonth = calculateBooksReadLastMonth();
		books_read_this_month = calculateBooksReadThisMonth();
		books_left_to_read = Math.max(0, monthly_book_goal - books_read_this_month);
		days_until_next_month = calculateDaysUntilNextMonth();

		if (booksReadLastMonth < monthly_book_goal) {
			show_penalty_message = true;
			penalty_amount = (monthly_book_goal - booksReadLastMonth) * 100;
		} else {
			show_penalty_message = false;
			penalty_amount = 0;
		}
	}

	onMount(() => {
		updateReadingStatus();
	});
</script>

<div class="max-w-screen-2xl m-auto text-lg p-4 py-12 sm:py-16 sm:p-8">
	<div class="font-medium">
		<p class="text-md sm:text-xl">My goal is to read two books a month. I have setup a deal with family to pay them $100 for every book I fail to complete. If I do fail, a message will appear here and whoever sees it will get to steal my cash.</p>
		<p></p>

		{#if show_penalty_message}
			<div class="bg-{calculateMessageColor()}-950 border border-{calculateMessageColor()}-400 text-{calculateMessageColor()}-700 px-4 py-3 rounded relative mt-8" role="alert">
				<strong class=""></strong>
				<span class="block sm:inline">If you are seeing this then I failed to meet my reading goal last month. 😢 Claim ${penalty_amount} by texting me before the end of the month.</span>
			</div>
		{/if}
		{#if !show_penalty_message}
			<div class="bg-blue-950/25 border border-blue-950 text-blue-400 px-4 py-3 rounded relative mt-8" role="alert">
				<strong class=""></strong>
				{#if books_read_this_month == 0}
					<span class="block sm:inline"
						>I read {books_read_last_month}
						{books_read_last_month < 2 ? 'book' : 'books'} last month and none this month. I have {days_until_next_month}
						{days_until_next_month < 2 ? 'day' : 'days'} left to read {books_left_to_read}
						{books_left_to_read < 2 ? 'book' : 'books'}.
					</span>
				{:else if books_read_this_month == monthly_book_goal}
					<span class="block sm:inline">I met my goal by reading {monthly_book_goal} {monthly_book_goal < 2 ? 'book' : 'books'} this month. </span>
				{:else}
					<span class="block sm:inline"
						>I read {books_read_last_month}
						{books_read_last_month < 2 ? 'book' : 'books'} last month and {books_read_this_month}
						{books_read_this_month < 2 ? 'book' : 'books'} ({getBooksReadThisMonth()
							.map((book) => book.name)
							.join(', ')}) this month. I have {days_until_next_month}
						{days_until_next_month < 2 ? 'day' : 'days'} left to read {books_left_to_read}
						{books_left_to_read < 2 ? 'book' : 'books'}.
					</span>
				{/if}
			</div>
		{/if}
	</div>

	<div class="all-initial mt-20">
		{#each getUniqueYears(books) as year}
			<div class="my-24">
				<h2 class=" mb-6 text-5xl text-center sm:text-left sm:text-7xl">{year}</h2>
				<hr />
				<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
					{#each sortBooksByFinishDate(books).filter((book) => book.end.includes(year)) as book}
						<div class="flex border border-zinc-900 border-b-8 p-4 h-full relative group">
							<a href="https://annas-archive.org/search?q={book.isbn}" target="_blank" rel="noopener" class=" absolute top-2 right-2 no-color p-2 z-50 " title="Read this for free! No scam bro trust me">
								<ArrowUpRight class=" group-hover:text-white transition duration-300 text-white sm:text-zinc-800 " />
							</a>

							<img src={book.img ? book.img : `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={`${book.name} cover`} class="h-80 object-contain group-hover:bg-gradient-to-br from-black to-white transition" loading="lazy" />
							<div class="text-center my-auto w-full px-2">
								<div class="font-medium">{book.name}</div>
								<div class="text-sm font-medium text-orange-300">{book.author}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
		<!-- <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each sortBooksByFinishDate(books) as book}
				<div class="group h-64 flex flex-col items-center justify-center p-4">
					<img src={book.img ? book.img : `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={`${book.name} cover`} class="h-40 mb-4 object-contain" />
					<div class="text-center">
						<div class="font-semibold">{book.name}</div>
						<div class="text-sm text-gray-600">{book.author}</div>
					</div>
				</div>
			{/each}
		</div> -->
	</div>
</div>
