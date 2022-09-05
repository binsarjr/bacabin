import { getServerByKeyOrFail } from '$lib/scraper';
import BaseKomik from '$lib/scraper/BaseKomik';
import type { IBaseKomik } from '$lib/scraper/BaseKomik/interfaces';
import KomikIndo from '$lib/scraper/id/KomikIndo';

import type { ServerList } from '$lib/scraper/types/Server';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params, url, parent, depends }) => {
	let server = getServerByKeyOrFail(params.server as string);
	const q = url.searchParams.get('q') || '';
	const lists = await server.list(q);

	return { lists, server: server.toObject(), q };
};
