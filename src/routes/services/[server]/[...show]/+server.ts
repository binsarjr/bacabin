/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getServerByKeyOrFail } from '$lib/scraper'
import { error, json, type RequestHandler } from '@sveltejs/kit'
export const GET: RequestHandler = async ({ params, url }) => {
	const server = getServerByKeyOrFail(params.server as string);

	const target = new URL(params.show as string)
	target.search = url.search

	const show = await server.show(target.toString());
	if (!show) throw error(404, 'Data tidak ditemukan');
	show.chapters = show.chapters.map((chapter) => {
		const ref = new URL(url.toString());
		ref.pathname = '/services/' + params.server + '/read/' + chapter.link;
		// @ts-ignore
		chapter['ref'] = ref;

		return chapter;
	});
	return json(show);
};
