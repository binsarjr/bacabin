<script lang="ts">
	// @ts-ignore
	import NProgress from 'nprogress';
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
	import { invalidate } from '$app/navigation';
	import { readData } from '../stores/read';
	export let prev: string | null;
	export let chapterList: string | null;
	export let next: string | null;
	let expand = false;
	async function reload() {
		goTop()
		NProgress.start()
		await invalidate('reading');
		NProgress.done()
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
	<div class="flex flex-col justify-center items-center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
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
	</div>
	<div class="bg-black py-2">
		<div class="px-2 w-full md:w-1/2 mx-auto">
			<div>
				<div class="flex gap-2 justify-between">
					<div />
					<div>
						<a
							href={chapterList}
							class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black"
							><Document /></a
						>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={reload}
							class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black cursor-pointer"
						>
							<Refresh />
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={goTop}
							class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black cursor-pointer"
						>
							<ArrowTop />
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={goDown}
							class="p-2 inline-block border border-white rounded hover:bg-white hover:text-black cursor-pointer"
						>
							<ArrowBottom />
						</div>
						<a
							href={prev}
							class="p-2 inline-block border border-white rounded"
							class:hover:bg-white={prev}
							class:hover:text-black={prev}
							class:opacity-50={!prev}><ArrowLeft /></a
						>
						<a
							href={next}
							class="p-2 inline-block border border-white rounded"
							class:hover:bg-white={next}
							class:hover:text-black={next}
							class:opacity-50={!next}><ArrowRight /></a
						>
					</div>
				</div>
			</div>
			{#if expand}
				<div class="py-5">
					<h2>{$readData?.title}</h2>
				</div>
			{/if}
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
	main {
		bottom: 0;
	}
	/* main:not(.active) {
		bottom: 0;
	}
	main.active {
		bottom: 0;
	} */
</style>
