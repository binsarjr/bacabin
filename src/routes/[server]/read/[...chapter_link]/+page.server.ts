import { getServerByKeyOrFail } from '$lib/scraper';
import { error, type Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const server = getServerByKeyOrFail(params.server as string);
	const item = await server.read(params.chapter_link as string);
	if (!item) throw error(404, 'Content Tidak ditemukan');
	let showLink = item.showLink || '';
	showLink = '';
	if (!showLink) {
		// menghapus -chapter-{numChapter}
		// karena biasanya format penulisan url seperti ini.
		// jadi jika showlink tidak ditemukan maka kita akan menggunakan ini sebagai alternatif
		showLink = (params.chapter_link as string).replace(/[-]+?chapter[-]+\d+(\.\d+)?$/, '');
	}
	return { item, server: params.server as string, showLink };
};
