<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	export let q = '';
	export let server: string | undefined = undefined;

	q ||= $page.url.searchParams.get('q') || '';

	let languages: string[] = [];
	let servers: string[] = [];
	onMount(async () => {
		languages = await trpc($page).serverLanguages.query();
		servers = await trpc($page).servers.query();
	});
	$: langSelected = $page.url.searchParams.getAll('lang');
	$: serverSelected = $page.url.searchParams.getAll('server');
</script>

<form method="get" action="/search">
	<strong>[NEW BETA]: Cari Komik berdasarkan server tercepat</strong>
	<div class="flex gap-2 items-center my-2 flex-wrap">
		<div>PILIH BAHASA:</div>
		{#each languages as lang, i}
			<label>
				<input
					type="checkbox"
					name="lang"
					value={lang}
					checked={langSelected.includes(lang) || i === 0}
				/>
				{lang}
			</label>
		{/each}
	</div>
	<span>Silakan Cari Komik Yang Anda inginkan</span>
	<div class="flex w-full gap-2 items-center mb-4">
		<label for="cari" class="flex-grow">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autocomplete="false"
				autofocus={!!q}
				name="q"
				type="text"
				class="form-control"
				bind:value={q}
				placeholder="Cari..."
			/>
		</label>
		<button class="px-4 py-2 rounded-lg text-white bg-green-500 font-semibold">Cari</button>
	</div>
	<div class=" flex flex-wrap gap-2 items-center">
		<div>PILIH SERVER:</div>
		{#each servers as item, i}
			<label>
				<input
					type="checkbox"
					name="server"
					value={item}
					checked={serverSelected.includes(item) || i === 0}
				/>
				{item}
			</label>
		{/each}
	</div>
	{#if q.length}
		<div class="mt-5">
			<p>
				Hasil Pencarian dari <strong>{q}</strong>.
				{#if server}
					Didapatkan dari server <a href="/{server}"><strong>{server}</strong></a>
				{/if}
			</p>
		</div>
	{/if}
	{#key $page.url.toString()}
		<input type="hidden" name="time" value={Date.now()} />
	{/key}
</form>
