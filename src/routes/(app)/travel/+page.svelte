<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<p class="m-24 p-8 border-red-800 border"><span class="text-red-400">(NYI)</span> Here be all the places I've been on a big map! </p>

<div class="map relative bg-blue-200 w-full" style="min-height: 50vh;">
	<div class="right-8 top-1/2 absolute flex items-center justify-center">
		<i class="bx bx-pin mx-1"></i>
		<p>Japan</p>
	</div>
	<div class="left-16 top-1/3 absolute flex items-center justify-center">
		<i class="bx bx-pin mx-1"></i>
		<p>Mexico</p>
	</div>
</div>

<table class="w-full border table-fixed m-auto mb-24">
	<tr>
		<th class="p-6">Date</th>
		<th class="p-6">Duration</th>
		<th>Place</th>
		<th>Pictures</th>
	</tr>
	<tr class="border">
		<td class="border text-center p-4">May 27, 2024 <span class="italic"> (320 days ago)</span></td>
		<td class="border text-center p-4">9 days</td>
		<td
			class="bg-gradient-to-br from-white to-red-200 bg-no-repeat border text-center w-fit p-2 text-lg font-semibold drop-shadow shadow-white"
			>⛩️Japan</td
		>
		<td class="border w-fit"
			><div class="flex-row flex gap-2 p-2">
				<div class="bg-red-300 border w-fit p-2 text-white">img1</div>
				<div class="bg-red border w-fit p-2 bg-black text-white">img2</div>
			</div></td
		>
	</tr>
	<tr class="border">
		<td class="border text-center p-4">July 3, 2021 <span class="italic"> (932 days ago)</span></td>
		<td class="border text-center p-4">7 days</td>
		<td
			class="bg-gradient-to-bl from-white to-blue-200 bg-no-repeat border text-center w-fit p-2 text-lg font-semibold drop-shadow shadow-white"
			>🌺Hawaii</td
		>
		<td class="border w-fit"
			><div class="flex-row flex gap-2 p-2">
				<div class="bg-red-300 border w-fit p-2 text-white">img1</div>
				<div class="bg-red border w-fit p-2 bg-black text-white">img2</div>
			</div></td
		>
	</tr>
</table>

<style>
</style>
