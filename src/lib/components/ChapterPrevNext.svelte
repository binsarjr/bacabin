<script lang="ts">
	export let prev: string | null;
	export let chapterList: string | null;
	export let next: string | null;
</script>

<div class="flex flex-col md:flex-row gap-10 my-5 md:justify-center md:items-center">
	<div>
		{#if prev}
			<a
				href={prev}
				class="py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Chapter Sebelumnya</a
			>
		{/if}
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
		{#if next}
			<a
				href={next}
				class="py-1 px-2 md:py-2 md:px-4 border border-white rounded hover:bg-white hover:text-black"
				>Chapter Selanjutnya</a
			>
		{/if}
	</div>
</div>
