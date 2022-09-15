<script lang="ts">
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { imgLazyLoading, imgLazyLoadingStop } from '$lib/browser-supports';
	import BackToTop from '$lib/components/BackToTop.svelte';
	// import lozad from 'lozad'
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import GotoDown from '$lib/components/GotoDown.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';
	import { onMount } from 'svelte';

	let prev = $page.data.item.prev ? `/${$page.data.server}/read/${$page.data.item.prev}` : null;
	let next = $page.data.item.next ? `/${$page.data.server}/read/${$page.data.item.next}` : null;
	let chapterList = $page.data.item.showLink
		? `/${$page.data.server}/${$page.data.item.showLink}`
		: null;
	let images = $page.data.item.chapterImages;
	$: {
		prev = $page.data.item.prev ? `/${$page.data.server}/read/${$page.data.item.prev}` : null;
		next = $page.data.item.next ? `/${$page.data.server}/read/${$page.data.item.next}` : null;
		chapterList = $page.data.item.showLink
			? `/${$page.data.server}/${$page.data.item.showLink}`
			: null;
		images = $page.data.item.chapterImages;
	}
	async function save() {
		$historyKomik = [
			{
				title: $page.data.item.title,
				server: $page.data.server,
				id: $page.data.showLink,
				link: $page.url.toString()
			},
			...$historyKomik.filter((history) => history.id != $page.data.showLink)
		];
		$historyChapter = [
			{
				title: $page.data.item.title,
				server: $page.data.server,
				id: $page.data.server + $page.data.item.title,
				link: $page.url.toString()
			},
			...$historyChapter.filter(
				(history) => history.id != $page.data.server + $page.data.item.title
			)
		];
	}

	async function reload() {
		goto(window.location.href, { noscroll: true });
	}
	// onMount(() => {
	// 	lozad().observe()
	// })
	save();
</script>

<svelte:head>
	<title>{$page.data.item.title}</title>
</svelte:head>
<GotoDown />
<BackToTop />
<div class="content">
	<div class="text-center">
		<h1>{$page.data.item.title}</h1>
	</div>
	<ChapterPrevNext {prev} {next} {chapterList} />
</div>
<div class="flex flex-col justify-center items-center">
	{#each images as image}
		{@const imageLink = image}
		<img src="{imageLink}" loading="lazy" />
	{/each}
</div>
<div id="reload" on:click={reload}>Reload</div>
<div class="content mb-[30vh]">
	<ChapterPrevNext {prev} {next} {chapterList} />
</div>

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
