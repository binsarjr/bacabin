<script lang="ts">
	import '../app.scss';

	// @ts-ignore
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';
	import { setDefaultOptions } from 'svelte-reveal';
	import { browser } from '$app/environment';
	import { preloadCode } from '$app/navigation';

	setDefaultOptions({
		transition: 'blur',
		duration: 800
	});

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});
	$: if (browser)
		preloadCode('*')
	

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<main id="layoutapp" class="py-5">
	<div class="mb-5 content flex gap-5 font-semibold">
		<a href="/">BacaBin</a>
		<a href="/bookmarks">My Bookmarks (All Server)</a>
		{#if $page.params.server}
			<a href="/{$page.params.server}">{$page.params.server}</a>
		{/if}
	</div>
	<slot />
</main>
