import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class KomikIndo extends BaseKomik {
	website = 'https://komikindo.id/';
	logo = 'https://i2.wp.com/i2.wp.com/kentut.xyz/uploads/2020/12/komikindo.png?w=140?w=140';
	async list(keyword: string = ''): Promise<Komik[]> {
		const link = new URL('https://komikindo.id/?s=');
		link.searchParams.set('s', keyword);

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.animepost').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr();
			const img = $(el).find('img').attr()['src'];
			results.push({
				show: anchorAttribute['href'],
				title: anchorAttribute['title'].replace(/^komik\s+/i, ''),
				img
			});
		});

		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link)
		const $ = await this.requestCheerio(link)
		const title = $('.infoanime h1.entry-title').text().replace(/^komik\s+/i, '')
		const img = $('.infoanime .thumb img').attr()['src']

		const chapters: Chapter[] = await chapFuture
		return { title, img, chapters }
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link)
		const chapters: Chapter[] = [];
		$('#chapter_list li').each((i, el) => {
			chapters.push({
				link: $(el).find('a chapter').parent().attr()['href'],
				title: `Chapter ${$(el).find('a chapter').text()}`
			})
		})
		return chapters
	}

	async read(chapter_link: string): Promise<ReadChapter> {
		const $ = await this.requestCheerio(chapter_link)
		const title = $('.chapter-content h1.entry-title').text().replace(/^komik\s+/i, '')


		const prevAttr = $('.nextprev:first-child a:first-child[rel="prev"]').attr()
		const prev = prevAttr ? prevAttr['href'] : null
		const nextAttr = $('.nextprev:first-child a:last-child[rel="next"]').attr()
		const next = nextAttr ? nextAttr['href'] : null
		const showLink = $('.nextprev:first-child a .daftarch').parent().attr()['href']

		const chapterImages: string[] = []
		$('#chimg-auh img').each((i, el) => {
			chapterImages.push($(el).attr()['src'])
		})
		return {
			title, next, prev, chapterImages, showLink
		}
	}

}

export default KomikIndo.getInstance();
