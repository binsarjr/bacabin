<script lang="ts">
	import { afterNavigate, beforeNavigate, goto, preloadData } from '$app/navigation';
	import loading from '$lib/assets/loading.gif';
	import { page } from '$app/stores';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import GotoDown from '$lib/components/GotoDown.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';
	import type { PageData } from './$types';
	import Reading from '$lib/components/Reading.svelte';
	import SvelteSeo from '../../../../lib/components/Seo/SvelteSeo.svelte';
	import ReaderControl from '../../../../lib/components/ReaderControl.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { readData, type DataReader } from '../../../../lib/stores/read';
	import type { ReadChapter } from '../../../../lib/scraper/BaseKomik/interfaces';
	import { readable } from 'svelte/store';
	export let data: PageData;

	const readChapter = async (chapterLink: string) => {
		const resp = await fetch('/services/' + data.server + '/read/' + chapterLink);
		if (resp.status == 404) return null;
		const json: ReadChapter = await resp.json();
		return json;
	};

	let loadingNext = false;
	let pageState: DataReader[] = [];
	let currentState = 0;
	let batasState = 10;

	let prev: string | null = '/#/prev';
	let next: string | null = '/#/next';
	let chapterList: string | null = '/#/chapterlist';

	$: hasNext = !!next
	$: if (pageState.length) prev = pageState[currentState].navigation.prev;
	$: if (pageState.length) next = pageState[currentState].navigation.next;
	$: if (pageState.length) chapterList = pageState[currentState].navigation.chapterList;

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

	const initial = () => {
		loadingNext = false;
		pageState = [
			{
				navigation: {
					prev: data.item.prev ? `/${data.server}/read/${data.item.prev}` : null,
					next: data.item.next ? `/${data.server}/read/${data.item.next}` : null,

					chapterList: data.item.showLink ? `/${data.server}/${data.item.showLink}` : null
				},
				item: data.item
			}
		];
		currentState = 0;
	};

	onMount(() => {
		initial();
	});
	afterNavigate(() => {
		initial();
	});

	$: if (browser && pageState.length) {
		$readData = pageState[currentState];
		pageState = pageState;
		save();
	}

	const onScroll = async () => {
		if (loadingNext) return;
		if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 100) {
			// jika state sudah lebih dari 5 maka berpindah halaman
			if (currentState >= batasState && $readData?.navigation.next) {
				return goto($readData?.navigation.next);
			}

			// you're at the bottom of the page
			if ($readData?.item.next) {
				loadingNext = true;
				let result = await readChapter($readData.item.next);
				let next = '/' + data.server + '/read/' + result?.next;
				if (result && loadingNext) {
					let item = {
						item: result,
						navigation: {
							prev: '/' + data.server + '/read/' + result.prev,
							next,
							chapterList: '/' + data.server + '/' + result.showLink
						}
					};

					pageState[pageState.length] = item;
					currentState += 1;
					if (currentState + 1 == batasState && result && result.next) preloadData(next);
					history.pushState({}, '', '/' + data.server + '/read/' + $readData.item.next);
				}
				loadingNext = false;
			}
		}
	};
</script>

<svelte:window on:wheel={onScroll} on:scroll={onScroll} />
<SvelteSeo
	title={data.server + ' - Bacabin'}
	description={'Mirror dari ' + data.server}
	canonical={$page.url.toString()}
	keywords={data.server + ',bacabin'}
	openGraph={{
		type: 'website',
		url: $page.url.toString(),
		title: data.item.title + ' - ' + data.server + ' - Bacabin',
		description: `${data.item.title} Mirror dari ${data.server} - Bacabin`,
		image: data.item.chapterImages[0],
		images: [
			{
				type: 'image/jpeg',
				url: data.item.chapterImages[0],
				width: '300',
				height: '300'
			}
		],
		site_name: data.server + ' - Bacabin'
	}}
/>

<ReaderControl />

<!-- Recreate element when value key is change -->
{#key $page.url.toString()}
	<!-- <GotoDown />
	<BackToTop /> -->
	<div class="mb-[30vh]">
		{#each pageState as state, i}
			<Reading bind:value={state.item} />
			<div class="h-[25vh]" />
		{/each}
		{#if loadingNext}
			<img src={loading} alt="loader" class="mx-auto" />
			<p class="text-center">Lagi ngambil data berikutnya</p>
		{/if}
		{#if !hasNext}
			<p class="text-center">.....Tidak ada lagi.....</p>
		{/if}
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- <div id="reload" on:click={reload}>Reload</div> -->
{/key}
