import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class Mangastic extends BaseKomik {
	website = 'https://mangareader.cc/';
	logo = 'https://mangareader.cc/frontend/imgs/logo.png';
	async dataHomepage() {
		const $ = await this.requestCheerio(this.website);
		const dataTemps: string[] = [];
		const results: Komik[] = [];
		// Manga Hot
		$('#content .carousel .carousel-cell').each((_, el) => {
			const title = $(el).find('h3').text();
			if (dataTemps.includes(title)) return;
			dataTemps.push(title);
			results.push({
				title,
				img: $(el).find('img').attr()['src'],
				show: $(el).find('a').attr()['href']
			});
		});

		// Popular Manga
		$('.postbody .popularmanga li').each((_, el) => {
			const title = $(el).find('h3').text();
			if (dataTemps.includes(title)) return;
			dataTemps.push(title);
			results.push({
				title,
				img: $(el).find('.img img').attr()['src'],
				show: $(el).find('.img a.series').attr()['href']
			});
		});

		// Latest manga
		$('.allgreen .mng').each((_, el) => {
			const title = $(el).find('h3.title_mg').text();
			if (dataTemps.includes(title)) return;
			dataTemps.push(title);
			results.push({
				title,
				img: $(el).find('.thumb img').attr()['src'],
				show: $(el).find('.thumb a.series').attr()['href']
			});
		});
		return results;
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const keyword = searchParams.get('q') || '';
		if (!keyword) return this.dataHomepage();
		searchParams.delete('q');
		const link = new URL('https://mangareader.cc/search');
		searchParams.set('s', keyword);
		searchParams.set('post_type', 'manga');

		link.search = searchParams.toString();
		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];

		$('li .anipost').each((_, el) => {
			results.push({
				title: $(el).find('h3.title_mg').text(),
				show: $(el).find('.left > a').attr()['href'],
				img: $(el).find('.thumb img').attr()['src']
			});
		});
		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('h1').text();
		const img = $('.imgdesc img').attr()['src'];
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
		$('ul li span.leftoff').each((_, el) => {
			chapters.push({
				title: $(el).find('a').text(),
				link: $(el).find('a').attr()['href']
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const chapterImages: string[] = $('#arraydata').text().split(',');
		const title = $('h1.chapter-title').text();
		const prevAttribute = $('.nextprev a.prev').attr();
		const prev = prevAttribute ? prevAttribute['href'] : null;
		const nextAttribute = $('.nextprev a.next').attr();
		const next = nextAttribute ? null : nextAttribute['href'];

		const showLink = $('h2.chapter-title:nth-child(1) a').attr()['href'];

		return { title, chapterImages, next, prev, showLink };
	}
}

export default Mangastic.getInstance();
