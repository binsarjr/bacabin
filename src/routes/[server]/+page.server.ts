import { getServerByKeyOrFail } from '$lib/scraper'
import { error, type Load } from '@sveltejs/kit'
import type { Komik } from '../../../../../../../Workspace/BINSAR/program/bacabin/src/lib/scraper/BaseKomik'

export const load: Load = async ({ params, url }) => {
	const server = getServerByKeyOrFail(params.server as string);
	const q = url.searchParams.get('q') || '';
	try {
		const target = new URL(url.toString())
		target.pathname='/services/'+params.server
		const resp = await fetch(target.toString())
		const lists:Komik[] = await resp.json();
		return { lists, server: server.toObject(), q };
	} catch (e) {
		throw error(500, e?.toString());
	}
};
