<script lang="ts">
	import { page } from '$app/stores';
	import type { Bookmark } from '$lib/stores/bookmarks';
	import MangaCard from './MangaCard.svelte';
	export let comics: Bookmark[] = [];
	let server = $page.params.server || '';
	let filteredComics = comics;
	let value = '';
	$: filteredComics = comics.filter((comic) => {
		value = value.toLowerCase();
		return comic.title.toLowerCase().includes(value);
	});
</script>

<div class="content">
	<h2>My Bookmarks | {server || 'All Server'}</h2>
	<div class="my-5">
		<input
			autocomplete="false"
			placeholder="Search Comics Bookmarks"
			type="text"
			class="form-control"
			id="cari"
			bind:value
		/>
	</div>
	<div class="my-10">
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-10">
				{#each filteredComics as item}
					<MangaCard {item} bookmark={item} />
				{:else}
					<p>Data tidak ditemukan</p>
				{/each}
		</div>
	</div>
</div>
