<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';

	import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces';
	import { useLazyImage } from 'svelte-lazy-image';
	export let value: ReadChapter;
	export let server: string;

	$: prev = value.prev ? `/${server}/read/${value.prev}` : null;
	$: next = value.next ? `/${server}/read/${value.next}` : null;
	$: chapterList = value.showLink ? `/${server}/${value.showLink}` : null;
	let images: string[] = [];

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	let isRunning = false;
	$: if (browser && isRunning === false) {
		(async () => {
			isRunning = true;
			for (const image of value.chapterImages) {
				images[images.length] = image;
				await sleep(1000);
			}
			isRunning = false;
		})();
	}

	function imageErr(index: number) {
		images[index] = images[index];
	}
</script>

<div>
	<div class="content">
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>
	<div class="flex flex-col justify-center items-center">
		{#each images as image, i}
			<img
				use:useLazyImage
				on:error={() => imageErr(i)}
				data-src={image}
				src="/loading.gif"
				alt={value.title + ' ' + (i + 1)}
				loading="lazy"
			/>
			<!-- <img src={imageLink} loading="lazy" /> -->
		{/each}
	</div>

	<div class="content">
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>

	<div class="text-center">
		<h1>{value.title}</h1>
	</div>
</div>
<!-- <Divider variant="solid" weight={2} orientation="h" class="my-10" /> -->
