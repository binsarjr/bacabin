<script lang="ts">
	import '../app.scss';
	

	// @ts-ignore
	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';
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
	<div class="mb-5">
		<a href="/">BacaBin</a>
	</div>
	<slot />
</main>
