<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { reveal } from 'svelte-reveal';
	import { lazyimage } from 'svelte-lazyimage-cache';
	import loading from '$lib/assets/loading.gif'
	export let data: PageData;
	const currentPathname = $page.url.pathname;
	let q = data.q;
	let tid: any;
	function search() {
		const currentUrl = new URL($page.url.toString());
		currentUrl.searchParams.set('q', q || '');

		goto(currentUrl.toString(), { replaceState: true, noScroll: true });
	}

	function onSearch() {
		tid && clearTimeout(tid);
		tid = setTimeout(() => {
			search();
		}, 5_000);
	}
	function keydown(e: any) {
		onSearch();
		if (e.keyCode == 13) {
			tid && clearTimeout(tid);
			search();
		}
	}
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
		<label for="cari">
			<span>Silakan Cari Komik Yang Anda inginkan</span>
			<input
				autocomplete="false"
				type="text"
				class="form-control"
				id="cari"
				bind:value={q}
				on:keydown={keydown}
				minlength={2}
				required
			/>
			<span
				>Silakan tekan [ENTER] atau tunggu 5 detik setelah Anda berhenti mengetik dan secara
				otomatis akan melakukan pencarian</span
			>
		</label>
		{#if q.length}
			<div class="mt-5">
				<p>
					Hasil Pencarian dari <strong>{q}</strong>.
				</p>
			</div>
		{/if}
	</div>

	<div class="py-3">
		<h2 class="mb-2">Baca Komik</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10">
			{#if data.lists.length === 0}
				Data Tidak Ditemukan.Coba cari komik lain
			{/if}
			{#key $page.url.toString()}
				{#each data.lists as list}
					<div class="cardpost" use:reveal>
						<a href={[currentPathname, list.show].join('/')}>
							<div class="image rounded">
								<img
									use:lazyimage
									data-src={list.img}
									src="{loading}"
									loading="lazy"
									alt="[img] {list.img}"
									width="100%"
								/>
								<div class="text-image">{list.title}</div>
							</div>
							<div>
								<p class="truncate ...">{list.title}</p>
							</div>
						</a>
					</div>
				{/each}
			{/key}
		</div>
	</div>
</div>
