<script lang="ts">
	export let data: import('./$types').PageData;
</script>

<div class="text-center">
	<h1>{data.item.title}</h1>
</div>
<div class="flex gap-5 justify-center items-center my-5">
	<div>
        {#if data.item.prev}
		<a href="/{data.server}/read/{data.item.prev}" class="py-2 px-4 border border-white rounded hover:bg-white hover:text-black">Chapter Selanjutnya</a>
        {/if}
	</div>
	<div>
        {#if data.item.showLink}
		<a href="/{data.server}/{data.item.showLink}" class="py-2 px-4 border border-white rounded hover:bg-white hover:text-black">Daftar Chapter</a>
        {/if}
	</div>
    <div>
        {#if data.item.next}
		<a href="/{data.server}/read/{data.item.next}" class="py-2 px-4 border border-white rounded hover:bg-white hover:text-black">Chapter Selanjutnya</a>
        {/if}
	</div>
</div>

<div class="flex flex-col justify-center items-center">
	{#each data.item.chapterImages as images}
		<img data-src={images} data-waiting>
	{/each}
</div>