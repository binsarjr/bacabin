<script lang="ts">
	export let data: import('./$types').PageData;
	let chapterAwal = data.item.chapters[0];
	let chapterAkhir =
		data.item.chapters[data.item.chapters.length === 0 ? 0 : data.item.chapters.length - 1];
</script>

<div class="content">
	<div class="text-center mb-5">
		<img src={data.item.img} alt={data.item.title} class="mx-auto" />
		<h1 class="py-5">{data.item.title}</h1>
		<div class="flex gap-5 justify-center items-center">
			<a
				href="/{data.server}/read/{chapterAkhir.link}"
				class="py-2 px-4 border rounded bg-secondary hover:bg-white hover:text-black"
				>{chapterAkhir.title}</a
			>
			<a
				href="/{data.server}/read/{chapterAwal.link}"
				class="py-2 px-4 border rounded bg-secondary hover:bg-white hover:text-black"
				>{chapterAwal.title}</a
			>
		</div>
	</div>
	<div class="bg-secondary rounded p-5">
		<h2>Chapter List</h2>
		<div class="mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{#each data.item.chapters as chapter}
				<div>
					<a
						href="/{data.server}/read/{chapter.link}"
						class="
                border border-white text-center rounded py-2 px-4 block
                hover:bg-white hover:text-black
                "
					>
						{chapter.title}
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
