<script>
	function handler() {
		let targetScroll = (window.outerHeight * 60) / 100;
		targetScroll += document.documentElement.scrollTop;
		window.scrollTo({ top: targetScroll, behavior: 'smooth' });
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handler}>
	<slot />
</div>
