<script lang="ts">
	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let data: import('./$types').PageData;
	let prev: string | null = null;
	let next: string | null = null;
	let chapterList: string | null = null;

	$: {
		prev = data.item.prev ? `/${data.server}/read/${data.item.prev}` : null;
		next = data.item.next ? `/${data.server}/read/${data.item.next}` : null;
		chapterList = data.item.showLink ? `/${data.server}/${data.item.showLink}` : null;
	}
</script>

<div class="content">
	<div class="text-center">
		<h1>{data.item.title}</h1>
	</div>
	<ChapterPrevNext {prev} {next} {chapterList} />
</div>
<div class="flex flex-col justify-center items-center">
	{#each data.item.chapterImages as image}
		<img data-src={image} src="" data-waiting />
	{/each}
</div>
<div class="content">
	<ChapterPrevNext {prev} {next} {chapterList} />
</div>
