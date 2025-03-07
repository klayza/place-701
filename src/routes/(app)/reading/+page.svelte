<script>
	import { ArrowUpRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;
	const { books } = data;

	// Constants
	const MONTHLY_BOOK_GOAL = 1;
	const PENALTY_AMOUNT_PER_BOOK = 100;

	// State variables
	let booksLeftToRead = 0;
	let daysUntilNextMonth = 0;
	let showPenaltyMessage = false;
	let penaltyAmount = 0;
	let booksReadThisMonth = 0;
	let booksReadThisMonthList = [];
	let booksReadLastMonth = 0;
	let messageColor = '';

	// Date utility functions
	function getCurrentMonthRange() {
		const today = new Date();
		const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
		const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
		return { currentMonthStart, nextMonthStart };
	}

	function getLastMonthRange() {
		const today = new Date();
		const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
		const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
		return { lastMonthStart, currentMonthStart };
	}

	function calculateDaysUntilNextMonth() {
		const today = new Date();
		const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
		return Math.ceil((nextMonth - today) / (1000 * 60 * 60 * 24));
	}

	// Book filtering and sorting functions
	function getBooksReadInDateRange(startDate, endDate) {
		return books.filter((book) => {
			if (!book.end) return false;
			const bookEndDate = new Date(book.end);
			return bookEndDate >= startDate && bookEndDate < endDate;
		});
	}

	function getBooksReadThisMonth() {
		const { currentMonthStart, nextMonthStart } = getCurrentMonthRange();
		return getBooksReadInDateRange(currentMonthStart, nextMonthStart);
	}

	function calculateBooksReadLastMonth() {
		const { lastMonthStart, currentMonthStart } = getLastMonthRange();
		return getBooksReadInDateRange(lastMonthStart, currentMonthStart).length;
	}

	function getUniqueYears() {
		return [
			...new Set(
				books
					.filter((book) => book.end)
					.map((book) => {
						try {
							const endDate = new Date(book.end);
							return isNaN(endDate.getTime()) ? null : endDate.getFullYear();
						} catch {
							return null;
						}
					})
					.filter(Boolean)
			)
		].sort((a, b) => b - a);
	}

	console.log(getUniqueYears());

	function sortBooksByFinishDate(bookList) {
		return [...bookList]
			.filter((book) => book.end)
			.sort((a, b) => {
				try {
					const dateA = new Date(a.end);
					const dateB = new Date(b.end);
					if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
					return dateB - dateA;
				} catch {
					return 0;
				}
			});
	}

	// Status calculation functions
	function calculateMessageColor() {
		if (booksLeftToRead === 0) {
			return 'green';
		} else if (booksLeftToRead > 0 && !showPenaltyMessage) {
			return 'blue';
		} else if (showPenaltyMessage) {
			return 'red';
		}
		return 'blue'; // Default
	}

	function updateReadingStatus() {
		booksReadLastMonth = calculateBooksReadLastMonth();
		booksReadThisMonthList = getBooksReadThisMonth();
		booksReadThisMonth = booksReadThisMonthList.length;
		booksLeftToRead = Math.max(0, MONTHLY_BOOK_GOAL - booksReadThisMonth);
		daysUntilNextMonth = calculateDaysUntilNextMonth();

		showPenaltyMessage = booksReadLastMonth < MONTHLY_BOOK_GOAL;
		penaltyAmount = showPenaltyMessage ? (MONTHLY_BOOK_GOAL - booksReadLastMonth) * PENALTY_AMOUNT_PER_BOOK : 0;
		
		messageColor = calculateMessageColor();
	}

	// Initialize on component mount
	onMount(updateReadingStatus);
</script>

<div class="px-4 pt-4 sm:p-4 sm:pt-24 sm:max-w-screen-lg sm:m-auto">
	<h2 class="mt-8 mb-4 text-6xl">Reading</h2>
	<p class="font-medium text-xl sm:text-2xl">
		My goal is to read one book every month. I have setup a deal with family to pay them $100 for every book I fail to complete. 
		If I do fail, a message will appear here and whoever sees it will get to steal my cash.
	</p>
	
	<div class="font-medium text-xl sm:text-2xl">
		{#if showPenaltyMessage}
			<div class="bg-{messageColor}-950 border border-{messageColor}-400 text-{messageColor}-700 px-4 py-3 rounded relative mt-8" role="alert">
				<span class="block sm:inline">
					If you are seeing this then I failed to meet my reading goal last month. 😢 
					Claim ${penaltyAmount} by texting me before the end of the month.
				</span>
			</div>
		{:else}
			<div class="bg-blue-950/25 border border-blue-950 text-blue-400 px-4 py-3 rounded relative mt-8" role="alert">
				{#if booksReadThisMonth === 0}
					<span class="block sm:inline">
						I read {booksReadLastMonth} {booksReadLastMonth < 2 ? 'book' : 'books'} last month and none this month. 
						I have {daysUntilNextMonth} {daysUntilNextMonth < 2 ? 'day' : 'days'} left to read 
						{booksLeftToRead} {booksLeftToRead < 2 ? 'book' : 'books'}.
					</span>
				{:else if booksReadThisMonth === MONTHLY_BOOK_GOAL}
					<span class="block sm:inline">
						I met my goal by reading {MONTHLY_BOOK_GOAL} {MONTHLY_BOOK_GOAL < 2 ? 'book' : 'books'} this month.
					</span>
				{:else}
					<span class="block sm:inline">
						I read {booksReadLastMonth} {booksReadLastMonth < 2 ? 'book' : 'books'} last month and 
						{booksReadThisMonth} {booksReadThisMonth < 2 ? 'book' : 'books'} 
						({booksReadThisMonthList.map((book) => book.name).join(', ')}) this month. 
						I have {daysUntilNextMonth} {daysUntilNextMonth < 2 ? 'day' : 'days'} left to read 
						{booksLeftToRead} {booksLeftToRead < 2 ? 'book' : 'books'}.
					</span>
				{/if}
			</div>
		{/if}
	</div>
</div>

<div class="max-w-screen-2xl m-auto text-lg p-4 py-12 sm:py-16 sm:p-8">
	<div class="all-initial mt-20">
		{#each getUniqueYears() as year}
			<div class="my-24">
				<h2 class="mb-6 text-5xl text-center sm:text-left sm:text-7xl">{year}</h2>
				<hr />
				<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
					{#each sortBooksByFinishDate(books).filter((book) => book.end.includes(year)) as book}
						<div class="flex border border-zinc-900 border-b-8 p-4 h-full relative group">
							<a href="https://annas-archive.org/search?q={book.isbn}" target="_blank" rel="noopener" 
							   class="absolute top-2 right-2 no-color p-2 z-50" title="Read this for free! No scam bro trust me">
								<ArrowUpRight class="group-hover:text-white transition duration-300 text-white sm:text-zinc-800" />
							</a>

							<img src={book.img ? book.img : `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} 
								 alt={`${book.name} cover`} 
								 class="h-80 object-contain " 
								 loading="lazy" />
							<div class="text-center my-auto w-full px-2">
								<div class="font-medium">{book.name}</div>
								<div class="text-sm font-medium text-orange-300">{book.author}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>