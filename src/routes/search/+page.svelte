<script lang="ts">
	import FormQuicksearch from './../../lib/components/FormQuicksearch.svelte'
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import MangaCard from '../../lib/components/MangaCard.svelte';
	export let data: PageData;
	let q = data.q;
	
</script>

<div class="content">
	<div class="my-10 mx-auto">
		<FormQuicksearch  server={data.server}/>
	</div>

	<div class="py-3">
		<h2 class="mb-2">Baca Komik</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-10">
			{#if data.lists.length === 0}
				Data Tidak Ditemukan.Coba cari komik lain
			{/if}
			{#key $page.url.toString()}
				{#each data.lists as item}
					<MangaCard {item} server={data.server} />
				{/each}
			{/key}
		</div>
	</div>
</div>
