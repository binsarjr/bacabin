import { dev } from '$app/environment';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { sitemapHook, type RouteDefinition } from '@binsarjr/sveltekit-sitemap';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { getServerByKeyOrFail, serverLists } from './lib/server/scraper';
import { sitemap } from './sitemap';
const serverPaths = (): RouteDefinition<false>[] => {
	const servers = serverLists();
	return servers.map((server) => {
		const def: RouteDefinition<false> = {
			path: `/${server.server}`,
			priority: '0.8'
		};
		if (server.img)
			def.image = {
				url: server.img,
				altText: '[LOGO] ' + server.title,
				title: server.title
			};
		return def;
	});
};

const serviceServerPaths = async () => {
	const servers = serverLists();
	const results: RouteDefinition<false>[] = [];
	await Promise.all(
		servers.map(async ({ server: serverName }) => {
			const server = getServerByKeyOrFail(serverName);
			if (!server) return null;
			try {
				const items = await server.list(new URLSearchParams());
				items.map((item) => {
					results.push({
						path: `/${serverName}/${item.show}`,
						priority: '0.7',
						changeFreq: 'Weekly',
						image: {
							url: item.img,
							altText: '[COVER] ' + item.title,
							title: item.title
						}
					});
				});
			} catch (error) {
				console.log('skip aja yang gak bisa diambil');
			}
		})
	);
	return results;
};

const sitemapHandler: Handle = async ({ event, resolve }) => {
	const resp = sitemapHook(sitemap, {
		getRoutes: async (event) => {
			return {
				'/[server]': serverPaths(),
				'/[server]/[...show]': await serviceServerPaths()
			};
		},
		getRobots: async (event) => {
			return !dev;
		}
	});
	const r = await resp({ event, resolve });

	return r;
};

export const handle: Handle = sequence(
	sitemapHandler,
	createTRPCHandle({
		router,
		createContext
	})
);
