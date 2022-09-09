<script lang="ts">
	import { page } from '$app/stores';

	import ChapterPrevNext from '$lib/components/ChapterPrevNext.svelte';
	import { historyChapter, historyKomik } from '$lib/stores/history';

	let prev = $page.data.item.prev ? `/${$page.data.server}/read/${$page.data.item.prev}` : null;
	let next = $page.data.item.next ? `/${$page.data.server}/read/${$page.data.item.next}` : null;
	let chapterList = $page.data.item.showLink
		? `/${$page.data.server}/${$page.data.item.showLink}`
		: null;
	let images = $page.data.item.chapterImages;
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
	save()
</script>

<svelte:head>
	<title>{$page.data.item.title}</title>
</svelte:head>

<div class="content">
	<div class="text-center">
		<h1>{$page.data.item.title}</h1>
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
