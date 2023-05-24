import { sveltekit } from '@sveltejs/kit/vite';
import { sitemapPlugin } from 'sveltekit-sitemap/dist/plugin';
import Icons from 'unplugin-icons/vite';
import type { UserConfig } from 'vite';
const config: UserConfig = {
	plugins: [
		sveltekit(),
		sitemapPlugin(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	ssr: {
		noExternal: ['devalue']
	}
};

export default config;
