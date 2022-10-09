<script lang="ts">
	import '../app.scss';

	// @ts-ignore
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';
	import { setDefaultOptions } from 'svelte-reveal';

	setDefaultOptions({
		transition: 'blur',
		duration: 800,
	});

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
</script>

<main id="layoutapp" class="py-5">
	<div class="mb-5 content">
		<a href="/">BacaBin</a>
	</div>
	<slot />
</main>
