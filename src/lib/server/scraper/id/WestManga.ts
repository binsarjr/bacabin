import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class WestManga extends BaseKomik {
	website = 'https://westmanga.id/';
	logo = 'https://i0.wp.com/i2.wp.com/westmanga.id/wp-content/uploads/2022/02/west.png?w=140';
	lang = 'indonesia';
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const link = new URL('https://westmanga.id/?s=');
		searchParams.set('s', searchParams.get('q') || '');
		searchParams.delete('q');
		link.search = searchParams.toString();

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.animepost').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr();
			const img = $(el).find('img').attr();
			if (!img) return;
			results.push({
				show: anchorAttribute['href'],
				title: anchorAttribute['title'].replace(/^komik\s+/i, ''),
				img: img['src']
			});
		});

		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('h1.entry-title')
			.text()
			.replace(/^komik\s+/i, '');
		const img = $('.thumb img').attr()['src'];

		const chapters: Chapter[] = await chapFuture;
		return { title, img, chapters };
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link);
		const chapters: Chapter[] = [];
		$('#chapter_list li').each((i, el) => {
			chapters.push({
				link: $(el).find('a chapter').parent().attr()['href'],
				title: $(el).find('a chapter').text()
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('.chapter-content h1.entry-title')
			.text()
			.replace(/^komik\s+/i, '');

		const prevAttr = $('.nextprev:first-child a:first-child[rel="prev"]').attr();
		const prev = prevAttr ? prevAttr['href'] : null;
		const nextAttr = $('.nextprev:first-child a:last-child[rel="next"]').attr();
		const next = nextAttr ? nextAttr['href'] : null;
		const showLink = $('.nextprev:first-child a .daftarch').parent().attr()['ref'];

		const chapterImages: string[] = [];
		$('#chimg img').each((i, el) => {
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

export default WestManga.getInstance();
