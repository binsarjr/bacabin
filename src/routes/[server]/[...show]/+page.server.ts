import { getServerByKeyOrFail } from '$lib/scraper';
import { error, type Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const server = getServerByKeyOrFail(params.server as string);
	try {
		const item = await server.show(params.show as string);
		if (!item) throw error(404, 'Data tidak ditemukan');
		return {
			item,
			server: params.server as string,
			show: params.show as string
		};
	} catch (e) {
		throw error(500, 'Gagal mengambil resources ke server yang di tuju');
	}
};
