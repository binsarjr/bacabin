<script lang="ts">
	// @ts-ignore
	import ArrowTop from '~icons/mdi/arrow-top-bold';
	// @ts-ignore
	import ArrowBottom from '~icons/mdi/arrow-bottom-bold';
	// @ts-ignore
	import Document from '~icons/mdi/document';

	// @ts-ignore
	import ArrowLeft from '~icons/mdi/arrow-left-bold';
	// @ts-ignore
	import ArrowRight from '~icons/mdi/arrow-right-bold';
	// @ts-ignore
	import Refresh from '~icons/mdi/refresh';
	import { goto } from '$app/navigation';

	export let prev: string | null;
	export let chapterList: string | null;
	export let next: string | null;
	let expand = false;
	async function reload() {
		goto(window.location.href, { noScroll: true });
	}
	function goTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	function goDown() {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}
</script>

<main class="fixed left-0 transition-all w-full" class:active={expand}>
    <!-- sementara di nonaktifkan dl -->
	<!-- <div class="flex flex-col justify-center items-center">
		<div
			class="bg-black rounded-t-md px-10 py-2 cursor-pointer"
			on:click={() => (expand = !expand)}
		>
			{#if expand}
				<ArrowBottom />
			{:else}
				<ArrowTop />
			{/if}
		</div>
	</div> -->
	<div class="bg-black py-2">
		<div class="px-2 w-full md:w-3/4">
			<div class="flex gap-2 justify-end">
				<a
					href={chapterList}
					class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
					><Document /></a
				>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={reload}
					class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
				>
					<Refresh />
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={goTop}
					class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
				>
					<ArrowTop />
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={goDown}
					class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
				>
					<ArrowBottom />
				</div>
				<a
					href={prev}
					class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
					><ArrowLeft /></a
				>
				<a
					href={next}
					class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
					><ArrowRight /></a
				>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-touch-callout: none;
	}
	main:not(.active) {
		bottom: 0;
	}
	main.active {
		bottom: 10px;
	}
</style>
