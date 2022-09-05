<script lang="ts">
	import '../app.scss';

	// @ts-ignore
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { imgLazyLoading } from '$lib/browser-supports';

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
		imgLazyLoading();
	});

	afterNavigate(() => {
		imgLazyLoading();
	});
</script>

<main id="layoutapp" class="py-5">
	<div class="mb-5">
		<a href="/">BacaBin</a>
	</div>
	<slot />
</main>
