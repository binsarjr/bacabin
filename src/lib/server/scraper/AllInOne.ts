import { servers } from '.';
import type { Komik } from './BaseKomik';
import type { IBaseKomik } from './BaseKomik/interfaces';

export type AllInOneKomik = (Komik & { server: string })[];

const getListOrThrowIn = async (server: IBaseKomik, searchParams: URLSearchParams) => {
	const _results = await server.list(searchParams);
	const results = _results as AllInOneKomik;
	if (results.length === 0) throw new Error('Data Not Found');
	return results.map((result) => {
		result['show'] = `/${server.name.toLowerCase()}/${result.show}`;
		result['server'] = server.name;
		return result;
	});
};

export const AllInOne = async (searchParams: URLSearchParams): Promise<Komik[]> => {
	let results: Komik[] = [];
	try {
		results = await Promise.any(
			Object.keys(servers).map((key) => {
				const server = servers[key];
				return getListOrThrowIn(server, searchParams);
			})
		);
		results ||= [];
	} catch (error) {
		results = [];
	}

	return results;
};
