<script lang="ts">
	import 'lazysizes';
	// import a plugin
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { imgLazyLoading, imgLazyLoadingStop } from '$lib/browser-supports';
	import BackToTop from '$lib/components/BackToTop.svelte';
	// import lozad from 'lozad'
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import GotoDown from '$lib/components/GotoDown.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let prev = data.item.prev ? `/${data.server}/read/${data.item.prev}` : null;
	let next = data.item.next ? `/${data.server}/read/${data.item.next}` : null;
	let chapterList = data.item.showLink ? `/${data.server}/${data.item.showLink}` : null;
	let images = data.item.chapterImages;
	$: {
		prev = data.item.prev ? `/${data.server}/read/${data.item.prev}` : null;
		next = data.item.next ? `/${data.server}/read/${data.item.next}` : null;
		chapterList = data.item.showLink ? `/${data.server}/${data.item.showLink}` : null;
		images = data.item.chapterImages;
	}
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
	<div class="content">
		<div class="text-center">
			<h1>{data.item.title}</h1>
		</div>
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>
	<div class="flex flex-col justify-center items-center">
		{#each images as image}
			{@const imageLink = image}
			<img data-src={imageLink} src="/loading.gif" class="lazyload" loading="lazy" />
			<!-- <img src={imageLink} loading="lazy" /> -->
		{/each}
	</div>
	<div id="reload" on:click={reload}>Reload</div>
	<div class="content mb-[30vh]">
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>
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
