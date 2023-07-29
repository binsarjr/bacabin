import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class Mangastic extends BaseKomik {
	website = 'https://mangastic.me/';
	logo = 'https://mangastic.me/wp-content/uploads/2021/11/Picture2.png';
	lang = 'english';

	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const keyword = searchParams.get('q') || '';
		searchParams.delete('q');
		const link = new URL('https://mangastic.me/?s=&op=&author=&artist=&release=&adult=');
		searchParams.set('s', keyword);
		searchParams.set('post_type', 'wp-manga');
		// searchParams.set('op', '');
		// searchParams.set('author', '');
		// searchParams.set('artist', '');
		// searchParams.set('release', '');
		// searchParams.set('adult', '');

		link.search = searchParams.toString();
		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.row.c-tabs-item__content').each((i, el) => {
			const imgEl = $(el).find('.tab-thumb img').attr()!;
			results.push({
				title: $(el).find('h3').text(),
				show: $(el).find('h3 a').attr()!['href'],
				img: imgEl['data-src'] || imgEl['src']
			});
		});
		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('.post-title h1').text();
		const img = $('.summary_image img').attr()!['data-src'];
		const chapters = await chapFuture;
		return {
			chapters,
			img,
			title
		};
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link);
		const chapters: Chapter[] = [];
		$('li.wp-manga-chapter').each((i, el) => {
			chapters.push({
				title: $(el).find('a').text(),
				link: $(el).find('a').attr()!['href']
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const chapterImages: string[] = [];
		const title = $('#chapter-heading').text();
		const prevAttribute = $('.nav-previous a').attr()!;
		const prev = prevAttribute ? prevAttribute['href'] : null;
		const nextAttribute = $('.nav-next a').attr()!;
		const next = /manga\s+info/i.test($('.nav-next a').text()) ? null : nextAttribute['href'];

		const showLink = $('.breadcrumb li:nth-child(2) a').attr()!['href'];

		$('.page-break.no-gaps').each((i, el) => {
			chapterImages.push($(el).find('img').attr()!['data-src']);
		});

		return { title, chapterImages, next, prev, showLink };
	}
}

export default Mangastic.getInstance();
