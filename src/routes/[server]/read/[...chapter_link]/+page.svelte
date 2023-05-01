<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import GotoDown from '$lib/components/GotoDown.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';
	import type { PageData } from './$types';
	import Reading from '$lib/components/Reading.svelte';
	import { chapterImagesStore, chapterLink } from '$lib/stores/image-caches';
	import { readData } from '../../../../lib/stores/read';
	import SvelteSeo from '../../../../lib/components/Seo/SvelteSeo.svelte';
	export let data: PageData;
	$: $readData = data.item;
	let preloadImages: string[] = [];
	$: {
		data.item.chapterImages;
		for (let i = 0; i < 3; i++) {
			preloadImages[preloadImages.length] = data.item.chapterImages[i];
		}
	}
	if ($page.url.toString() == $chapterLink) {
		data.item.chapterImages = $chapterImagesStore;
	} else {
		$chapterLink = $page.url.toString();
		$chapterImagesStore = data.item.chapterImages;
	}

	async function save() {
		const historyData = {
			title: data.item.title,
			server: data.server,
			id: data.item.showLink!,
			link: $page.url.toString()
		};
		$historyKomik = [
			historyData,
			...$historyKomik.filter((history: any, index: number) => {
				if (index > 100) return false;
				return history.id != data.item.showLink;
			})
		];
		$historyChapter = [
			historyData,
			...$historyChapter.filter((history: any, i: number) => {
				if (i > 100) return false;
				return history.id != data.server + data.item.title;
			})
		];
	}

	async function reload() {
		goto(window.location.href, { noScroll: true });
	}
	save();
</script>

<SvelteSeo
title={data.server+" - Bacabin"}
description={"Mirror dari "+data.server}	
canonical={$page.url.toString()}
keywords={data.server+",bacabin"}
openGraph={{
	type: "website",
	url: $page.url.toString(),
	title:data.server+" - Bacabin",
	description: `Baca ${data.item.title} Mirror dari ${data.server}`,
	images: [
		{
			url: data.item.chapterImages[0]
		}
	],
	site_name: data.server+" - Bacabin"
}}
></SvelteSeo>

<svelte:head>
	<title>{data.item.title}</title>
	{#each preloadImages as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<!-- Recreate element when value key is change -->
{#key $page.url.toString()}
	<!-- <GotoDown />
	<BackToTop /> -->
	<div class="mb-[30vh]">
		<Reading value={data.item} server={data.server} />
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- <div id="reload" on:click={reload}>Reload</div> -->
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
