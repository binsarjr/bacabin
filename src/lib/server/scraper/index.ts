import { error } from '@sveltejs/kit';
import type { IBaseKomik } from './BaseKomik/interfaces';
import Asura from './en/Asura';
import Manganato from './en/Manganato';
import Mangareader from './en/Mangareader';
import Bacakomik from './id/Bacakomik';
import Kiryuu from './id/Kiryuu';
import KomikIndo from './id/KomikIndo';
import Komikav from './id/Komikav';
import Komiku from './id/Komiku';
import Mangayaro from './id/Mangayaro';
import MirrorKomik from './id/MirrorKomik';
import NgomikNet from './id/NgomikNet';

export const servers: { [i: string]: IBaseKomik } = {
	komiku: Komiku,
	// 'shinigami-id': ShinigamiId,
	ngomiknet: NgomikNet,
	komikindo: KomikIndo,
	bacakomik: Bacakomik,
	manganato: Manganato,
	// mangastic: Mangastic
	// mgkomik: Mgkomik
	// westmanga: WestManga,
	mangareader: Mangareader,
	asura: Asura,
	kiryuu: Kiryuu,
	komikav: Komikav,
	mangayaro: Mangayaro,
	// komikcast: Komikcast,
	mirrorkomik: MirrorKomik
	// akoma: AkomaIndonesia,
	// 'akoma-en':AkomaEnnglish
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
