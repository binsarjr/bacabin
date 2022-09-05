import type { ServerList } from '$lib/scraper/types/Server';
import type { Load } from '@sveltejs/kit';

interface Server {
	title: string;
	url: string;
	img?: string;
	server: ServerList;
}

export const load: Load = async () => {
	const servers: Server[] = [
		{
			server: 'komikindo',
			title: 'komikindo',
			img: 'https://i2.wp.com/i2.wp.com/kentut.xyz/uploads/2020/12/komikindo.png?w=140?w=140',
			url: 'https://komikindo.id/'
		},
		{
			server: 'komikindo',
			title: 'komikindo',
			img: 'https://i2.wp.com/i2.wp.com/kentut.xyz/uploads/2020/12/komikindo.png?w=140?w=140',
			url: 'https://komikindo.id/'
		},
		{
			server: 'komikindo',
			title: 'komikindo',
			img: 'https://i2.wp.com/i2.wp.com/kentut.xyz/uploads/2020/12/komikindo.png?w=140?w=140',
			url: 'https://komikindo.id/'
		},
		{
			server: 'komikindo',
			title: 'komikindo',
			img: 'https://i2.wp.com/i2.wp.com/kentut.xyz/uploads/2020/12/komikindo.png?w=140?w=140',
			url: 'https://komikindo.id/'
		},
		{ server: 'komikindo', title: 'komikindo', url: 'https://komikindo.id/' },
		{ server: 'komikindo', title: 'komikindo', url: 'https://komikindo.id/' }
	];

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
