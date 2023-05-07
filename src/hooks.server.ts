import { dev } from '$app/environment'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import type { RouteDefinition } from 'sveltekit-sitemap'
import { getServerByKeyOrFail, serverLists } from './lib/scraper'
import { sitemap } from './sitemap'
import { sitemapHook } from './temp'

const serverPaths = (): RouteDefinition<true> => {
	const servers = serverLists();
	return servers.map((server) => {
		const def: RouteDefinition<true> = {
			path: `/${server.server}`,
			priority: '0.8'
		};
		if (server.img)
			def.image = {
				url: server.img,
				altText: '[LOGO] ' + server.title,
				title: server.title
			};
		return def as RouteDefinition<true>;
	}) as RouteDefinition<true>;
};

const serviceServerPaths = async () => {
	const servers = serverLists();
	const results: any[] = [];
	await Promise.all(
		servers.map(async ({ server: serverName }) => {
			const server = getServerByKeyOrFail(serverName);
			if (!server) return null;
			const items = await server.list(new URLSearchParams());
			items.map((item) => {
				results.push({
					path: `/${serverName}/${item.show}`,
					priority: '0.7',
					image: {
						url: item.img,
						altText: '[COVER] ' + item.title,
						title: item.title
					}
				});
			});
		})
	);
	return results;
};

const sitemapHandler: Handle = async ({ event, resolve }) => {
	const resp = sitemapHook(sitemap, {
		getRoutes: async (event) => {
			return {
				'/[server]': serverPaths(),
                '/[server]/[...show]': await serviceServerPaths(),
				'/services': false
			};
		},
		getRobots: async (event) => {
			return !dev;
		}
	});
	const r = await resp({ event, resolve });

	return r;
};

export const handle: Handle = sequence(sitemapHandler);
