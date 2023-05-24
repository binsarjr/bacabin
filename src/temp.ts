// sementara smpai librarynya di update
import type { Handle } from '@sveltejs/kit';
import {
	generateRobots,
	type RO_Sitemap,
	type RouteDefinition,
	type RouteDefinitions,
	type SitemapParams
} from 'sveltekit-sitemap';

export const encodeXML = (str: string) => {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
};

export const generateSitemap = <S extends RO_Sitemap>(
	definitions: RouteDefinitions<S>,
	baseUrl: string,
	sitemap: S
) => {
	// Instantiate a routes object with all the static routes
	// The will be override if you pass custom settings
	const routes: Record<string, RouteDefinition<boolean>> = Object.keys(sitemap).reduce(
		(acc, route) => {
			const isDynamic = route.includes('[');
			if (!isDynamic) {
				Object.assign(acc, {
					[route]: {
						path: route,
						priority: route === '/' ? '1.0' : '0.7'
					} as RouteDefinition<boolean>
				});
			}
			return acc;
		},
		{}
	);

	// Add custom route data to the routes object
	Object.entries(sitemap).forEach(([route]) => {
		const RouteDefinition = definitions[route as keyof typeof definitions];
		if (RouteDefinition) {
			if (Array.isArray(RouteDefinition)) {
				RouteDefinition.forEach((definition) => {
					Object.assign(routes, { [definition.path]: definition });
				});
			} else {
				Object.assign(routes, { [RouteDefinition?.path || route]: RouteDefinition });
			}
		}
	});

	// Build and return sitemap
	// refs : https://github.com/sveltejs/kit/issues/1142#issuecomment-1032407693 https://github.com/Shopify/hydrogen/blob/1de3864214d04d9214e323d7f0a953c7b9309b7b/templates/demo-store/src/routes/sitemap.xml.server.ts
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.entries(routes)
	.map(([r, { path, priority, changeFreq, image, lastMod }]) => {
		return `  <url>
    <loc>${baseUrl}${path || r}</loc>
  ${lastMod ? `<lastmod>${lastMod}</lastmod>` : ''}
  ${priority ? `<priority>${priority}</priority>` : ''}
  ${changeFreq ? `<changefreq>${changeFreq}</changefreq>` : ''}
  ${
		image
			? `
    <image:image>
      <image:loc>${encodeXML(image.url)}</image:loc>
      <image:title>${encodeXML(image.title ?? ' ')}</image:title>
      <image:caption>${encodeXML(image.altText ?? ' ')}</image:caption>
    </image:image>`
			: ''
	}
    </url>`;
	})
	.join('\n')}
</urlset>`;
};

export const sitemapHook =
	<S extends RO_Sitemap>(sitemap: S, params: SitemapParams<S> | undefined = {}): Handle =>
	async ({ event, resolve }) => {
		if (event.url.pathname === '/sitemap.xml') {
			// Get dynamic custom definition for app routes
			const routeDefinitions = params.getRoutes ? await params.getRoutes(event) : {};
			return new Response(generateSitemap(routeDefinitions, event.url.origin, sitemap), {
				status: 200,
				headers: {
					'Content-Type': 'application/xml'
				}
			});
		}

		if (event.url.pathname === '/robots.txt') {
			// Get dynamic robots directives
			const robots = params.getRobots ? await params.getRobots(event) : true;

			// Build and return the robots.txt
			return new Response(generateRobots<S>(robots, event.url.origin), {
				headers: {
					'content-type': 'text/plain',
					// Cache it for 24 hours
					'cache-control': `max-age=${60 * 60 * 24}`
				}
			});
		}

		return resolve(event);
	};
