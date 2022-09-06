import { serverLists } from '$lib/scraper';
import type { ServerList } from '$lib/scraper/types/Server';
import type { Load } from '@sveltejs/kit';

interface Server {
	title: string;
	url: string;
	img?: string;
	server: ServerList;
}

export const load: Load = async () => {
	
	const servers: Server[] = serverLists()

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
