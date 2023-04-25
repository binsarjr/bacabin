<script lang="ts">
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import { reveal } from 'svelte-reveal';
	import { lazyimage } from 'svelte-lazyimage-cache';
	import loading from '$lib/assets/loading.gif';
	import { browser } from '$app/environment';
	import MangaCard from '../../lib/components/MangaCard.svelte';
	export let data: PageData;
	const currentPathname = $page.url.pathname;
	let formCari: HTMLFormElement;
	let q = data.q;
	let tid: any;
	const resetCari = () => tid && clearTimeout(tid);
	function onSearch() {
		resetCari();
		tid = setTimeout(() => {
			if (formCari) formCari.submit();
		}, 5_000);
	}
	$: if (q.length > 2 && browser) onSearch();
</script>

<svelte:head>
	<title>{data.server.name} - BacaBin</title>
	<link rel="icon" href={data.server.logo} />
</svelte:head>

<div class="content">
	<div class="my-10 mx-auto">
		<img src={data.server.logo} alt={data.server.name} width="100px" />
		<h5>
			@credit: <a href={data.server.website} class="text-blue-500 hover:text-blue-800"
				>{data.server.website}</a
			>
		</h5>
		<div class="my-10 tracking-wide">
			<p>
				Selamat Datang di server <strong>{data.server.name}</strong>. Silakan menikmati waktumu.
			</p>
			<p>
				Cek list bookmarks di server {data.server.name}
				<a href="{$page.url.pathname}/bookmarks" class="text-blue-500 hover:text-blue-800">disini</a
				>
			</p>
		</div>
		<form method="get" on:submit={resetCari} bind:this={formCari}>
			<label for="cari">
				<span>Silakan Cari Komik Yang Anda inginkan</span>
				<!-- svelte-ignore a11y-autofocus -->
				<input
					autocomplete="false"
					name="q"
					type="text"
					class="form-control"
					bind:value={q}
					placeholder="Cari..."
				/>
				<span>Silakan tekan [ENTER] atau tunggu 5 detik untuk melakukan pencarian</span>
			</label>
			{#if q.length}
				<div class="mt-5">
					<p>
						Hasil Pencarian dari <strong>{q}</strong>.
					</p>
				</div>
			{/if}
		</form>
	</div>

	<div class="py-3">
		<h2 class="mb-2">Baca Komik</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-10">
			{#if data.lists.length === 0}
				Data Tidak Ditemukan.Coba cari komik lain
			{/if}
			{#key $page.url.toString()}
				{#each data.lists as item}
					<MangaCard {item}/>
				{/each}
			{/key}
		</div>
	</div>
</div>
