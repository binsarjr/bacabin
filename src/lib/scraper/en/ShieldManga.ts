import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class ShieldManga extends BaseKomik {
	website = 'https://m.shieldmanga.io/';
	logo = 'https://m.shieldmanga.io/wp-content/uploads/2017/10/logo.png';
	async list(keyword: string = ''): Promise<Komik[]> {
		const link = new URL('https://m.shieldmanga.io/?s=&post_type=wp-manga');
		link.searchParams.set('s', keyword);

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.c-tabs-item__content').each((i, el) => {
			const anchorAttribute = $(el).find('a img.img-responsive').parent().attr();
			const img = $(el).find('img.img-responsive').attr()['src'];
			results.push({
				show: anchorAttribute['href'],
				title: anchorAttribute['title'].replace(/^manga\s+/i, ''),
				img
			});
		});

		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('.post-title h1')
			.text()
			.replace(/^manga\s+/i, '');
		const img = $('.summary_image a img').attr()['src'];

		const chapters: Chapter[] = await chapFuture;
		return { title, img, chapters };
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link);
		const chapters: Chapter[] = [];
		$('ul.main li').each((i, el) => {
			chapters.push({
				link: $(el).find('a').attr()['href'],
				title: $(el).find('a').text()
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('h1#chapter-heading')
			.text()
			.replace(/^manga\s+/i, '');

		const prevAttr = $('.header .nav-links a.btn.prev_page').attr();
		const prev = prevAttr ? prevAttr['href'] : null;
		const nextAttr = $('.header .nav-links a.btn.next_page').attr();
		const next = nextAttr ? nextAttr['href'] : null;
		const allChap = $('.header .nav-links a.btn.back').attr();
		const showLink = allChap ? allChap['href'] : null;

		const chapterImages: string[] = [];
		$('.reading-content img').each((i, el) => {
			chapterImages.push($(el).attr()['src']);
		});
		return {
			title,
			next,
			prev,
			chapterImages,
			showLink
		};
	}
}

export default ShieldManga.getInstance();
