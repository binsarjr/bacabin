import { getServerByKeyOrFail } from '$lib/scraper';
import { error, type Load } from '@sveltejs/kit';

export const load: Load = async ({ params, url }) => {
	const server = getServerByKeyOrFail(params.server as string);
	const q = url.searchParams.get('q') || '';
	try {
		const lists = await server.list(url.searchParams);
		return { lists, server: server.toObject(), q };
	} catch (e) {
		throw error(500, e?.toString());
	}
};
