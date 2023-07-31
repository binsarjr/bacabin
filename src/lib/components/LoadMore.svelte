<script lang="ts">
	import { page } from '$app/stores';
	import type { Komik } from '$lib/server/scraper/BaseKomik';
	import loader from '$lib/assets/loading.gif';
	import { trpc } from '$lib/trpc/client';

	export let data: Komik[];
	let nextPage = 1;
	let hasMoreNextPage = true;
	let loading = false;
	const next = async () => {
		loading = true;
		const results = await trpc($page).list.query({
			server: $page.params.server,
			next: ++nextPage
		});
		if (results.length === 0) hasMoreNextPage = false;
		results.map((result) => {
			data[data.length] = result;
		});
		loading = false;
	};
</script>

{#if loading}
	<img src={loader} alt="loading" class="mx-auto" />
{/if}
{#if hasMoreNextPage}
	<button class="bg-secondary px-4 py-2 rounded w-full mt-10" type="button" on:click={next}
		>{loading ? 'loading...' : 'Load more if exists'}</button
	>
{/if}
