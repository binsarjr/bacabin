<script lang="ts">
	import ArrowLeft from '~icons/mdi/arrow-left-bold';
	import ArrowRight from '~icons/mdi/arrow-right-bold';
	export let prev: string | null;
	export let chapterList: string | null;
	export let next: string | null;
</script>

<div class="flex flex-row gap-10 my-5 justify-end items-center">
	<div>
		{#if chapterList}
			<a
				href={chapterList}
				class="py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Daftar Chapter</a
			>
		{/if}
	</div>
	<div class="flex gap-2">
		{#if prev}
			<a
				href={prev}
				class="py-2 px-8 inline-block border border-white rounded hover:bg-white hover:text-black"
				><ArrowLeft /></a
			>
		{/if}
		{#if next}
			<a
				href={next}
				class="py-2 px-8 inline-block border border-white rounded hover:bg-white hover:text-black"
				><ArrowRight /></a
			>
		{/if}
	</div>
	<!-- <div>
		{#if prev}{/if}
	</div>
	<div class="self-center">
		{#if chapterList}
			<a
				href={chapterList}
				class="py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Daftar Chapter</a
			>
		{/if}
	</div>
	<div class="self-end">
		{#if next}<a
				href={prev}
				class="py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				><ArrowLeft /></a
			>
			<a
				href={next}
				class="py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
			/>
		{/if}
	</div> -->
</div>
