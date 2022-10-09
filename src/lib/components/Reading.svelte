<script lang="ts">
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';

	import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces';
	import { useLazyImage } from 'svelte-lazy-image';
	export let value: ReadChapter;
	export let server: string;

	let prev = value.prev ? `/${server}/read/${value.prev}` : null;
	let next = value.next ? `/${server}/read/${value.next}` : null;
	let chapterList = value.showLink ? `/${server}/${value.showLink}` : null;
	let images = value.chapterImages;
</script>

<div>
	<div class="content">
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
		<ChapterPrevNext {prev} {next} {chapterList} />
	</div>
	<div class="flex flex-col justify-center items-center">
		{#each images as image}
			{@const imageLink = image}
			<img use:useLazyImage data-src={imageLink} src="/loading.gif" alt={value.title} />
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
