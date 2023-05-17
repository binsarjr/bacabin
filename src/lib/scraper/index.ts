import { error } from '@sveltejs/kit'
import type { IBaseKomik } from './BaseKomik/interfaces'
import Manganato from './en/Manganato'
import Mangareader from './en/Mangareader'
import Mangastic from './en/Mangastic'
import WebtoonEnglish from './en/WebtoonEnglish'
import Bacakomik from './id/Bacakomik'
import KomikIndo from './id/KomikIndo'
import Komiku from './id/Komiku'
import WebtoonIndonesia from './id/WebtoonIndonesia'
import WestManga from './id/WestManga'

export const servers: { [i: string]: IBaseKomik } = {
	komikindo: KomikIndo,
	komiku: Komiku,
	bacakomik: Bacakomik,
	manganato: Manganato,
	mangastic: Mangastic,
	// mgkomik: Mgkomik,
	westmanga: WestManga,
	mangareader: Mangareader,
	'webtoon-id': WebtoonIndonesia,
	'webtoon-en': WebtoonEnglish,
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
			lang: server.lang
		};
	});
};
export const getServerByKeyOrFail = (key: string) => {
	const server = servers[key];
	if (!server) throw error(404);
	return server;
};
