import { json, type Action } from '@sveltejs/kit';
import { AllInOne } from '../../lib/server/scraper/AllInOne';

export const GET: Action = async ({ url }) => {
	const response = await AllInOne(url.searchParams);
	return json(response);
};
