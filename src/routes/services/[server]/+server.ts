import { getServerByKeyOrFail } from '$lib/scraper';
import { json, type RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ params, url }) => {
	const server = getServerByKeyOrFail(params.server as string);
	let lists = await server.list(url.searchParams);
	lists = lists.map((list) => {
		const ref = new URL(url.toString());
		ref.pathname = '/services/' + params.server + '/' + list.show;
		// @ts-ignore
		list['ref'] = ref.toString();
		return list;
	});
	return json(lists);
};
