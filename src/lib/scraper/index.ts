import { error } from '@sveltejs/kit';
import type { IBaseKomik } from './BaseKomik/interfaces';
import Bacakomik from './id/Bacakomik';
import KomikIndo from './id/KomikIndo';
import Komiku from './id/Komiku';
import type { ServerList } from './types/Server';

const servers: { [i: ServerList]: IBaseKomik } = {
	komikindo: KomikIndo,
	bacakomik: Bacakomik,
	komiku: Komiku
};

export const serverLists = () => {
	return Object.keys(servers).map((key) => {
		const server = servers[key];
		return {
			title: server.name,
			url: server.website,
			img: server.logo,
			server: key
		};
	});
};
export const getServerByKeyOrFail = (key: string) => {
	const server = servers[key];
	if (!server) throw error(404);
	return server;
};
