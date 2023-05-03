import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>{
   "/": true,
   "/[server]": true,
   "/[server]/[...show]": false,
   "/[server]/bookmarks": false,
   "/[server]/read/[...chapter_link]": false,
   "/[server]/read": true,
   "/bookmarks": false,
   "/services": true
}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
