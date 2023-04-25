<script lang="ts">
	import { browser } from '$app/environment';
	import { preloadData } from '$app/navigation';
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import { refererImage } from '$lib/mirrorimage';

	import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces';
	import { lazyimage } from 'svelte-lazyimage-cache';
	import ClickToScroll from './ClickToScroll.svelte';
	import placeholderImgSrc from '$lib/assets/placeholder.gif';
	import ReaderControl from './ReaderControl.svelte';
	export let value: ReadChapter;
	export let server: string;

	let prev: string | null = '/#/prev';
	let next: string | null = '/#/next';
	let chapterList: string | null = '/#/chapterlist';
	$: chapterImages = value.chapterImages;

	$: if (browser) {
		prev = value.prev ? `/${server}/read/${value.prev}` : null;
		next = value.next ? `/${server}/read/${value.next}` : null;
		chapterList = value.showLink ? `/${server}/${value.showLink}` : null;
	}
	$: if (browser && next) preloadData(next);

	function onError(index: number) {
		return (el: any) => {
			// when load again. it must be have placeholder image
			el.target.src = placeholderImgSrc;
			setTimeout(() => {
				const target = new URL(chapterImages[index]);
				if (target.searchParams.has('url') && target.searchParams.has('referer')) {
					let url = target.searchParams.get('url') || '';
					let referer = target.searchParams.get('referer') || '';
					chapterImages[index] = refererImage(url, referer);
					console.log('[reload]', chapterImages[index]);
				} else {
					target.searchParams.set('time', Date.now().toString());
					chapterImages[index] = target.toString();
				}
				el.target.src = chapterImages[index];
			}, 1000);
		};
	}
</script>

<ReaderControl {prev} {next} bind:chapterList />
<div>
	<div class="content">
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
		<!-- <ChapterPrevNext {prev} {next} {chapterList} /> -->
	</div>

	<div class="flex flex-col justify-center items-center">
		<ClickToScroll>
			{#each chapterImages as image, i}
			{#key  image}
				<img
					use:lazyimage
					data-src={image}
					src={placeholderImgSrc}
					alt={value.title + ' ' + (i + 1)}
					loading="lazy"
					class="mx-auto"
				/>
			{/key}
			{/each}
		</ClickToScroll>
	</div>

	<div class="content">
		<!-- <ChapterPrevNext {prev} {next} {chapterList} /> -->
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
	</div>
</div>
<!-- <Divider variant="solid" weight={2} orientation="h" class="my-10" /> -->
