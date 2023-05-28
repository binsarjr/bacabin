<script lang="ts">
	import { page } from '$app/stores';
	import loading from '$lib/assets/loading.gif';

	import { reveal } from 'svelte-reveal';
	import type { Komik } from '../server/scraper/BaseKomik';
	import { lazyimage } from 'svelte-lazyimage-cache';
	import type { Bookmark } from '../stores/bookmarks';

	export let item: Komik;
	export let server: string|undefined=undefined
	export let bookmark: Bookmark | undefined = undefined;
	
</script>

<div class="cardpost " use:reveal>
	<a href={[server, item.show].join('/')}>
		<div class="image rounded  transition duration-0 ease-in-out hover:scale-105 hover:-translate-y-3">
			<img use:lazyimage data-src={item.img} src={loading} loading="lazy" alt="[img] {item.img}" />
			<div class="text-image">{item.title}</div>
		</div>
		<div>
			<!-- <p class="truncate ...">{item.title}</p> -->
		</div>
	</a>
	{#if bookmark}
		<p>
			Server: <a href={bookmark.serverLocation} class="text-blue-500 hover:text-blue-800"
				>{bookmark.server}</a
			>
		</p>
	{/if}
</div>

<style lang="scss">
	.cardpost {
		height: 100%;
		.image {
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			&:hover .text-image {
				display: block;
			}
			.text-image {
				display: block;
				position: absolute;
				right: 0;
				left: 0;
				bottom: 0;
				@apply p-3 font-medium;
				background-color: rgba($color: #000000, $alpha: 0.88);
			}
		}
	}
    * {
        @apply text-sm;
    }
</style>
