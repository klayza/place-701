<script>
</script>

<div class="max-w-5xl mx-auto px-1 sm:px-6 lg:px-8">
	<div class="article-navigation mt-8 mb-12">
		<ul class="space-y-2 sm:columns-2 lg:columns-3"></ul>
	</div>
	<div class="md-output">
		<slot />
	</div>

		<!-- <p class="text-center my-10">
			<a href={backPath} class="text-xl hover:underline">Return</a>
		</p> -->
</div>

<!-- <style>
	.md-output img {
		border-radius: 1.5rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.md-output h2 {
		font-size: 1.875rem;
		font-weight: bold;
		margin-top: 3rem;
		margin-bottom: 1.5rem;
	}

	.md-output p {
		margin-bottom: 1rem;
	}

	.md-output blockquote {
		position: relative;
		margin: 1.25rem 0;
		padding: 1rem;
		background-color: #1f2937;
		color: white;
		border: 4px solid black;
		font-style: italic;
		max-height: 12rem;
		overflow: hidden;
		transition: max-height 0.3s ease-in-out;
	}

	.md-output blockquote.expanded {
		max-height: none;
	}

	.md-output .expand-button {
		position: absolute;
		z-index: 10;
		right: 50%;
		transform: translateX(50%);
		bottom: -1rem;
		border-radius: 9999px;
		background-color: #1f2937;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s;
	}

	.md-output .expand-button svg {
		transition: transform 0.3s;
	}

	.md-output .expand-button svg.rotate-180 {
		transform: rotate(180deg);
	}

	@media (min-width: 640px) {
		.article-navigation ul {
			column-count: 2;
		}
	}

	@media (min-width: 1024px) {
		.article-navigation ul {
			column-count: 3;
		}
	}
</style> -->
