<script lang="ts">
	export let prev: string | null;
	export let chapterList: string | null;
	export let next: string | null;
</script>

<div class="flex gap-1 md:gap-5 justify-center items-center my-5">
	<div>
		{#if prev}
			<a
				href={prev}
				class="text-sm md:text-base py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Chapter Sebelumnya</a
			>
		{/if}
	</div>
	<div>
		{#if chapterList}
			<a
				href={chapterList}
				class="text-sm md:text-base py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Daftar Chapter</a
			>
		{/if}
	</div>
	<div>
		{#if next}
			<a
				href={next}
				class="text-sm md:text-base py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Chapter Selanjutnya</a
			>
		{/if}
	</div>
</div>

<style>
    a {
        font-size: .5rem;
        font-weight: bold;
        @apply sm:text-base;
    }
</style>