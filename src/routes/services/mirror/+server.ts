import { error, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, setHeaders, request }) => {
	let urlTarget = url.searchParams.get('url');

	if (!urlTarget || !url.searchParams.get('referer'))
		throw error(422, 'Mohon masukkan query string url dan referer');

	urlTarget = decodeURIComponent(urlTarget);

	const headers: any = {};

	for (const [key, value] of url.searchParams.entries()) {
		if (key !== 'url') headers[key] = decodeURIComponent(value);
		if (key == 'cache')
			setHeaders({
				cache: decodeURIComponent(value),
				'cache-control': decodeURIComponent(value),
			});
	}

	const responseMirror = await fetch(urlTarget, { headers });
	const imageBlob = Buffer.from(await responseMirror.arrayBuffer());

	return new Response(imageBlob);
};

