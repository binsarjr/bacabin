<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import GotoDown from '$lib/components/GotoDown.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';
	import type { PageData } from './$types';
	import Reading from '$lib/components/Reading.svelte';
	export let data: PageData;

	async function save() {
		const historyData = {
			title: data.item.title,
			server: data.server,
			id: data.showLink,
			link: $page.url.toString()
		};
		$historyKomik = [
			historyData,
			...$historyKomik.filter((history) => history.id != data.showLink)
		];
		$historyChapter = [
			historyData,
			...$historyChapter.filter((history) => history.id != data.server + data.item.title)
		];
	}

	async function reload() {
		goto(window.location.href, { noscroll: true });
	}
	save();
</script>

<svelte:head>
	<title>{data.item.title}</title>
</svelte:head>

<!-- Recreate element when value key is change -->
{#key $page.url.toString()}
	<GotoDown />
	<BackToTop />
	<div class="mb-[30vh]">
		<Reading value={data.item} server={data.server} />
	</div>
	<div id="reload" on:click={reload}>Reload</div>
{/key}

<style>
	#reload {
		@apply rounded py-2 px-4 cursor-pointer;
		opacity: 1;
		transition: opacity 0.5s, visibility 0.5s;
		position: fixed;
		z-index: 99;
		right: 20px;
		user-select: none;
		bottom: 80px;
		color: white;
		background-color: black;
	}
</style>
