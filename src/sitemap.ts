import type { RO_Sitemap } from '@binsarjr/sveltekit-sitemap';

export const sitemap = (<const>{
   "/[server]/[...show]": false,
   "/[server]/bookmarks": false,
   "/[server]": false,
   "/[server]/read/[...chapter_link]": false,
   "/[server]/read": false,
   "/bookmarks": true,
   "/": true,
   "/search": true,
   "/services": true
}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
