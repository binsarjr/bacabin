<script lang="ts">
	import { refererImage } from '$lib/mirrorimage';

	import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces';
	import { lazyimage } from 'svelte-lazyimage-cache';
	import placeholderImgSrc from '$lib/assets/placeholder.gif';
	import { clickToScroll } from '../action/clickToScroll';
	export let value: ReadChapter;

	$: chapterImages = value.chapterImages;

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

<div class="w-full">
	<div class="content">
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
	</div>

	<div class="flex flex-col justify-center items-center w-full" use:clickToScroll>
			{#each chapterImages as image, i}
				{#key image}
					<img
						use:lazyimage
						data-src={image}
						src={placeholderImgSrc}
						alt={value.title + ' ' + (i + 1)}
						loading="lazy"
						class="mx-auto w-full md:w-3/4"
					/>
				{/key}
			{/each}
	</div>

	<div class="content">
		<div class="text-center">
			<h1>{value.title}</h1>
		</div>
	</div>
</div>
<!-- <Divider variant="solid" weight={2} orientation="h" class="my-10" /> -->
