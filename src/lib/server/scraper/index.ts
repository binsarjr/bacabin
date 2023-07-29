import Asura from '$lib/server/scraper/en/Asura';
import Kiryuu from '$lib/server/scraper/id/Kiryuu';
import Mangayaro from '$lib/server/scraper/id/Mangayaro';
import NgomikNet from '$lib/server/scraper/id/NgomikNet';
import ShinigamiId from '$lib/server/scraper/id/ShinigamiId';
import { error } from '@sveltejs/kit';
import type { IBaseKomik } from './BaseKomik/interfaces';
import Manganato from './en/Manganato';
import Mangareader from './en/Mangareader';
import Mangastic from './en/Mangastic';
import Bacakomik from './id/Bacakomik';
import Komiku from './id/Komiku';

export const servers: { [i: string]: IBaseKomik } = {
	'shinigami-id': ShinigamiId,
	ngomiknet: NgomikNet,
	komiku: Komiku,
	// komikindo: KomikIndo,
	bacakomik: Bacakomik,
	manganato: Manganato,
	mangastic: Mangastic,
	// mgkomik: Mgkomik,
	// westmanga: WestManga,
	mangareader: Mangareader,
	asura: Asura,
	kiryuu: Kiryuu,
	// komikav: Komikav,
	mangayaro: Mangayaro
	// komikcast: Komikcast,
};

export const serverLists = () => {
	return Object.keys(servers).map((key) => {
		const server = servers[key];
		return {
			title: server.name,
			url: server.website,
			img: server.logo,
			server: key,
			lang: server.lang
		};
	});
};
export const getServerByKeyOrFail = (key: string) => {
	const server = servers[key];
	if (!server) throw error(404);
	return server;
};
