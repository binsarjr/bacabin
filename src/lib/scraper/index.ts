import { error } from '@sveltejs/kit'
import type { IBaseKomik } from './BaseKomik/interfaces'
import Manganato from './en/Manganato'
import Mangareader from './en/Mangareader'
import Mangastic from './en/Mangastic'
import Bacakomik from './id/Bacakomik'
import KomikIndo from './id/KomikIndo'
import WestManga from './id/WestManga'

export const servers: { [i: string]: IBaseKomik } = {
	komikindo: KomikIndo,
	bacakomik: Bacakomik,
	manganato: Manganato,
	mangastic: Mangastic,
	// mgkomik: Mgkomik,
	westmanga: WestManga,
	mangareader: Mangareader,
	// asura: Asura
};

export const serverLists = () => {
	return Object.keys(servers).map((key) => {
		const server = servers[key];
		return {
			title: server.name,
			url: server.website,
			img: server.logo,
			server: key,
			lang: server.lang,
		};
	});
};
export const getServerByKeyOrFail = (key: string) => {
	const server = servers[key];
	if (!server) throw error(404);
	return server;
};
