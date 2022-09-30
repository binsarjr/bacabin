import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class SekteKomik extends BaseKomik {
	website = 'https://komiku.com/';
	logo = 'https://komiku.com/wp-content/uploads/2022/03/logooo.png';
	async list(keyword: string = ''): Promise<Komik[]> {
		const link = new URL('https://komiku.com/?s=');
		link.searchParams.set('s', keyword);

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		//console.log($('div.listupd .utao'));
		$('.bs').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr();
			const img = $(el).find('img').attr()['src'];
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
		const title = $('h1.entry-title')
			.text()
			.replace(/^manga\s+/i, '');
		const img = $('.thumb img').attr()['src'];

		const chapters: Chapter[] = await chapFuture;
		return { title, img, chapters };
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link);
		const chapters: Chapter[] = [];
		$('#chapterlist li').each((i, el) => {
			chapters.push({
				link: $(el).find('.eph-num a span.chapternum').parent().attr()['href'],
				title: $(el).find('.eph-num a span.chapternum').text()
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('h1.entry-title')
			.text()
			.replace(/^manga\s+/i, '');

		const prevAttr = $('.nextprev:first-child a:first-child[rel="prev"]').attr();
		const prev = prevAttr ? prevAttr['href'] : null;
		const nextAttr = $('.nextprev:first-child a:last-child[rel="next"]').attr();
		const next = nextAttr ? nextAttr['href'] : null;
		const showLink = $('.allc a').parent().attr()['href'];

		const chapterImages: string[] = [];
		$('#readerarea img.ts-main-image').each((i, el) => {
			chapterImages.push($(el).find('img').attr()['src']);
		});
		console.log(prevAttr);
		return {
			title,
			next,
			prev,
			chapterImages,
			showLink
		};
	}
}

export default SekteKomik.getInstance();
