import { getServerByKeyOrFail } from '$lib/scraper';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	const server = getServerByKeyOrFail(params.server as string);

	const resp = await server.read(params.chapter_link as string);
	return json(resp);
};
