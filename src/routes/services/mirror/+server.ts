import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, setHeaders, request }) => {
	const isUseBase64 = url.searchParams.has('base64');

	let urlTarget = url.searchParams.get('url');
	let referrer = url.searchParams.get('referer');

	if (!urlTarget || !referrer) throw error(422, 'Mohon masukkan query string url dan referer');

	urlTarget = decodeURIComponent(urlTarget);
	referrer = decodeURIComponent(referrer);
	if (isUseBase64) {
		urlTarget = Buffer.from(urlTarget, 'base64').toString();
		referrer = Buffer.from(referrer, 'base64').toString();
	}

	let headers: any = {};

	for (const [key, value] of url.searchParams.entries()) {
		if (key !== 'url') headers[key] = decodeURIComponent(value);
	}

	headers['user-agent'] =
		'Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36' +
		Date.now();
	console.log(headers);

	console.log(urlTarget);

	const responseMirror = await fetch(urlTarget, { headers });
	headers = Object.fromEntries(responseMirror.headers);
	setHeaders(headers);

	const imageBlob = Buffer.from(await responseMirror.arrayBuffer());

	return new Response(imageBlob);
};
