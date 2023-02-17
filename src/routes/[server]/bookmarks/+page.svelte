<script lang="ts">
	import { page } from '$app/stores';
	import Bookmarks from '$lib/components/Bookmarks.svelte';
	import { bookmarks, type Bookmark } from '$lib/stores/bookmarks';

	let comics = Object.keys($bookmarks)
		.map((key) => {
			let bookmark = $bookmarks[key];
			if (bookmark.server != $page.params.server) return null;
			return bookmark;
		})
		.filter(Boolean) as Bookmark[];
</script>

<Bookmarks {comics} />
