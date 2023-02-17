import { json, type Action } from '@sveltejs/kit';
import { AllInOne } from '../../lib/scraper/AllInOne';

export const GET: Action = async ({ url }) => {
	const response = await AllInOne(url.searchParams);
	return json(response);
};
