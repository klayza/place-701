<script>
	import { books } from '$lib/data.js';
	import { onMount } from 'svelte';

	const monthly_book_goal = 2;
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

	function toggleFullTitle(element) {
    element.classList.toggle('full-title');
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

<p class="w-full bg-black text-white uppercase text-2xl z-10 p-4">Reading List</p>

<div class="max-w-screen-lg m-auto text-lg p-2 py-12 sm:py-16 sm:p-8">
	<div>
		<p class="text-md sm:text-xl">I love to read, and have just begun to read regularly. My goal is to read two books a month. I have setup a deal with family to pay them $100 for every book I fail to complete. If I do fail, a message will appear here and whoever sees it will get to steal my cash.</p>
		<p></p>

		{#if show_penalty_message}
			<div class="bg-{calculateMessageColor()}-100 border border-{calculateMessageColor()}-400 text-{calculateMessageColor()}-700 px-4 py-3 rounded relative mt-8" role="alert">
				<strong class="font-bold"></strong>
				<span class="block sm:inline">If you are seeing this then I failed to meet my reading goal last month. 😢 Claim ${penalty_amount} by texting me before the end of the month.</span>
			</div>
		{/if}
		{#if !show_penalty_message}
			<div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-8" role="alert">
				<strong class="font-bold"></strong>
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

	<div class="md-output all-initial text-md sm:text-xl mt-20">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each books as book}
				<div class="group h-64 flex flex-col items-center justify-center p-4">
					<img 
						src={book.img ? book.img : `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} 
						alt={`${book.name} cover`} 
						class="h-40 mb-4 object-contain"
					/>
					<div class="text-center w-full">
						<div class="title-container font-semibold cursor-pointer" 
								 title={book.name}
								 on:click={(e) => toggleFullTitle(e.target)}>
							{book.name}
						</div>
						<div class="text-sm text-gray-600">{book.author}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	</div>	
	
	<style>
		.title-container {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			max-height: 2.5em; /* Adjust this value based on your font size and line height */
		}
	
		.title-container::after {
			content: "...";
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 0 0.25em;
			background: white; /* Match this with your background color */
			font-weight: normal;
		}
	
		.full-title {
			display: block;
			-webkit-line-clamp: unset;
			max-height: none;
		}
	
		.full-title::after {
			display: none;
		}
	</style>