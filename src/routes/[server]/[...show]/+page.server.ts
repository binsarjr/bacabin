import { getServerByKeyOrFail } from '$lib/scraper';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const server = getServerByKeyOrFail(params.server as string);
	const item = await server.show(params.show as string);
	console.log(item, params.show as string);
};
