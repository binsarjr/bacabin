<script lang="ts">
	import { page } from '$app/stores';
	import type { Bookmark } from '$lib/stores/bookmarks';
	import { lazyimage } from 'svelte-lazyimage-cache';
	import { reveal } from 'svelte-reveal';

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
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10">
			<div class="cardpost" use:reveal>
				{#each filteredComics as item}
					<a href={item.show}>
						<div class="image">
							<img
								use:lazyimage
								data-src={item.img}
								src="/loading.gif"
								loading="lazy"
								alt="[img] {item.title}"
								width="100%"
							/>
							<div class="text-image">{item.title}</div>
						</div>
						<div>
							<p class="truncate ...">{item.title}</p>
						</div>
					</a>
					<p>
						Server: <a href={item.serverLocation} class="text-blue-500 hover:text-blue-800"
							>{item.server}</a
						>
					</p>
				{:else}
					<p>Data tidak ditemukan</p>
				{/each}
			</div>
		</div>
	</div>
</div>
