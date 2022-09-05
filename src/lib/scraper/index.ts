import { error } from '@sveltejs/kit';
import type { IBaseKomik } from './BaseKomik/interfaces';
import KomikIndo from './id/KomikIndo';
import type { ServerList } from './types/Server';

const servers: { [i: ServerList]: IBaseKomik } = {
	komikindo: KomikIndo
};
export const getServerByKeyOrFail = (key: string) => {
	const server = servers[key];
	if (!server) throw error(404);
	return server;
};
