export const clickToScroll = (node: HTMLElement) => {
	node.onclick = () => {
		let targetScroll = (window.outerHeight * 60) / 100;
		targetScroll += document.documentElement.scrollTop;

		// untuk trigger on scroll
		{
			window.scrollTo(window.pageXOffset, window.pageYOffset - 1);
			window.scrollTo(window.pageXOffset, window.pageYOffset + 1);
		}
		window.scrollTo({ top: targetScroll, behavior: 'smooth' });
	};

	return {
		destroy() {
			node.onclick = null;
		}
	};
};
