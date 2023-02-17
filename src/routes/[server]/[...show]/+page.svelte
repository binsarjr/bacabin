<script lang="ts">
	import { page } from '$app/stores';
	import { bookmarks } from '$lib/stores/bookmarks';
	import { reveal } from 'svelte-reveal';

	export let data: import('./$types').PageData;
	let q = '';
	let chapterAwal = data.item.chapters[0];
	let chapterAkhir =
		data.item.chapters.length < 2 ? null : data.item.chapters[data.item.chapters.length - 1];

	let chapters = data.item.chapters;
	$: if (q.length) {
		q = q.replace(/\s+/, ' ');
		chapters = data.item.chapters.filter((chapter) => new RegExp(q, 'i').test(chapter.title));
	}
	let bookmark = false;
	if ($bookmarks[$page.url.pathname]) bookmark = true;

	$: bookmarkImg = bookmark ? '/bookmarked.svg' : '/bookmark.svg';
	$: {
		if (bookmark) {
			$bookmarks[$page.url.pathname] = {
				img: data.item.img,
				show: $page.url.toString(),
				server: data.server,
				serverLocation: `/${data.server}`,
				title: data.item.title
			};
		} else {
			delete $bookmarks[$page.url.pathname];
			$bookmarks = $bookmarks;
		}
	}
	const onBookmark = () => {
		bookmark = !bookmark;
	};
</script>

<svelte:head>
	<title>{data.item.title}</title>
</svelte:head>

<div class="content">
	<div class="text-center mb-5">
		<img use:reveal src={data.item.img} alt={data.item.title} class="mx-auto" />
		<div class="flex justify-center items-center gap-2">
			<h1 class="py-5">
				{data.item.title}
			</h1>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="cursor-pointer" on:click={onBookmark}
				><img src={bookmarkImg} class="inline" alt="" /></span
			>
		</div>
		<div class="mb-5">
			Cek
			<a href={data.show} class="text-blue-500 hover:text-blue-800" target="_blank" rel="noreferrer"
				>di sini</a
			> untuk detail lainnya.
		</div>
		<div class="flex gap-5 justify-center items-center">
			{#if chapterAkhir}
				<a
					href="/{data.server}/read/{chapterAkhir.link}"
					class="py-2 px-4 border rounded bg-secondary hover:bg-white hover:text-black"
					>{chapterAkhir.title}</a
				>
			{/if}

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
				<div use:reveal>
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
