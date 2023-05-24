import { serverLists } from '$lib/server/scraper';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
	const servers = serverLists();

	const connection: { link: string; text: string; platform: string }[] = [
		{ link: 'https://github.com/binsarjr', text: 'github.com/binsarjr', platform: 'Github' },
		{
			link: 'https://www.linkedin.com/in/binsarjr/',
			text: 'Binsar Dwi Jasuma',
			platform: 'LinkedIn'
		}
	];
	return {
		servers,
		connection
	};
};
