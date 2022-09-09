<script lang="ts">
	import { page } from '$app/stores';

	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';

	export let data: import('./$types').PageData;
	let prev = data.item.prev ? `/${data.server}/read/${data.item.prev}` : null;
	let next = data.item.next ? `/${data.server}/read/${data.item.next}` : null;
	let chapterList = data.item.showLink ? `/${data.server}/${data.item.showLink}` : null;
	let images = data.item.chapterImages;

	$: {
		prev = data.item.prev ? `/${data.server}/read/${data.item.prev}` : null;
		next = data.item.next ? `/${data.server}/read/${data.item.next}` : null;
		chapterList = data.item.showLink ? `/${data.server}/${data.item.showLink}` : null;
		images = data.item.chapterImages;
		$historyKomik = [
			{
				title: $page.data.item.title,
				server: $page.data.server,
				id: $page.data.showLink,
				link: $page.url.toString()
			},
			...$historyKomik.filter((history) => history.id != $page.data.showLink)
		];
		$historyChapter= [
			{
				title: $page.data.item.title,
				server: $page.data.server,
				id: $page.data.server+$page.data.item.title,
				link: $page.url.toString()
			},
			...$historyChapter.filter((history) => history.id != $page.data.server+$page.data.item.title)
		];
	}
</script>

<svelte:head>
	<title>{data.item.title}</title>
</svelte:head>

<div class="content">
	<div class="text-center">
		<h1>{data.item.title}</h1>
	</div>
	<ChapterPrevNext {prev} {next} {chapterList} />
</div>
<div class="flex flex-col justify-center items-center">
	{#each images as image}
		<img data-src={image} src="" data-waiting />
	{/each}
</div>
<div class="content">
	<ChapterPrevNext {prev} {next} {chapterList} />
</div>
