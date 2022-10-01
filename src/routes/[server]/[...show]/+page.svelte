<script lang="ts">
	export let data: import('./$types').PageData;
	let q = '';
	let chapterAwal = data.item.chapters[0];
	let chapterAkhir =
		data.item.chapters[data.item.chapters.length === 0 ? 0 : data.item.chapters.length - 1];
	let chapters = data.item.chapters;
	$: if (q.length) {
		q = q.replace(/\s+/, ' ');
		chapters = data.item.chapters.filter((chapter) => new RegExp(q, 'i').test(chapter.title));
	}
</script>

<svelte:head>
	<title>{data.item.title}</title>
</svelte:head>

<div class="content">
	<div class="text-center mb-5">
		<img src={data.item.img} alt={data.item.title} class="mx-auto" />
		<h1 class="py-5">{data.item.title}</h1>
		<div class="mb-5">
			Cek
			<a href={data.show} class="text-blue-500 hover:text-blue-800" target="_blank">di sini</a> untuk
			detail lainnya.
		</div>
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
		<input
			autocomplete="false"
			type="text"
			class="form-control"
			bind:value={q}
			placeholder="Cari Chapter di sini"
		/>
		<div class="mt-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{#each chapters as chapter}
				<div>
					<a
						href="/{data.server}/read/{chapter.link}"
						class="
                border border-white text-center  rounded py-2 px-4 block
                hover:bg-white hover:text-black visited:bg-gray-600
                "
					>
						{chapter.title}
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
