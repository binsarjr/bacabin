<script lang="ts">
	import '../app.scss';

	// @ts-ignore
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';

	import 'lazysizes';
	// import a plugin
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';

	// NProgress css
	import 'nprogress/nprogress.css';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { imgLazyLoading, imgLazyLoadingStop } from '$lib/browser-supports';

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

	beforeNavigate(() => {
		imgLazyLoadingStop();
	});

	afterNavigate(() => {
		imgLazyLoading();
	});
</script>

<main id="layoutapp" class="py-5">
	<div class="mb-5 content">
		<a href="/">BacaBin</a>
	</div>
	<slot />
</main>
