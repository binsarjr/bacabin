<script lang="ts">
	import '../app.scss';
	import type { PageData } from './$types';

	import { Breadcrumb, Crumb } from '@brainandbones/skeleton';
	export let data: PageData;

	// @ts-ignore
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});
	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	onMount(() => {
		document.querySelectorAll('img[data-src]').forEach((el: any) => {
			el.setAttribute('src', el.attributes['data-src'].value);
		});
	});
	afterNavigate(() => {
		document.querySelectorAll('img[data-src]').forEach((el: any) => {
			el.setAttribute('src', el.attributes['data-src'].value);
		});
	});
</script>

<main id="layoutapp" class="py-5">
	{#if data.breadcrumbs}
		<Breadcrumb class="mb-3">
			{#each data.breadcrumbs as breadcrumb, i}
				{#if data.breadcrumbs.length - 1 == i}
					<Crumb current>
						{breadcrumb.text}
					</Crumb>
				{:else}
					<Crumb href={breadcrumb.link}>
						{breadcrumb.text}
					</Crumb>
				{/if}
			{/each}
		</Breadcrumb>
	{/if}
	<slot />
</main>
