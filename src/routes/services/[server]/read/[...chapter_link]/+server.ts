import { getServerByKeyOrFail } from '$lib/scraper'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params, url }) => {
	const server = getServerByKeyOrFail(params.server as string);

	const target = new URL(params.chapter_link as string)
	target.search = url.search

	const resp = await server.read(target.toString());
	return json(resp);
};
