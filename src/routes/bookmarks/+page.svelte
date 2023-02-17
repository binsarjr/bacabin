<script>
	import Bookmarks from '$lib/components/Bookmarks.svelte';
	import { bookmarks } from '$lib/stores/bookmarks';
	let comics = Object.keys($bookmarks).map((key) => $bookmarks[key]);
</script>

<Bookmarks {comics} />
