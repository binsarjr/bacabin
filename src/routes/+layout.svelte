<script lang="ts">
	import type { PageData } from './$types';

	import { Breadcrumb, Crumb } from '@brainandbones/skeleton';
	import '../app.scss';
	export let data: PageData;
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
