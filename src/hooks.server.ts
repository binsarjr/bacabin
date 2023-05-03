import { dev } from '$app/environment'
import type { Handle } from '@sveltejs/kit'
import { sitemapHook, type RouteDefinition } from 'sveltekit-sitemap'
import { serverLists } from './lib/scraper'
import { sitemap } from './sitemap'


const serverPaths = (): RouteDefinition<true> => {
    const servers = serverLists()
    return servers.map(server => {
        const def: RouteDefinition<true> = {
            path: `/${server.server}`,
            priority: '0.8'
        }
        if (server.img) def.image = {
            url: server.img,
            altText: '[LOGO] ' + server.title,
            title: server.title,
        }
        return def as RouteDefinition<true>
    }) as RouteDefinition<true>
}


export const handle: Handle = sitemapHook(sitemap, {
    getRoutes: async (event) => {
        return {
            '/[server]': serverPaths(),
        }
    },
    getRobots: async (event) => {
        return !dev
    }
})
