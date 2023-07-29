import { refererImage } from '$lib/mirrorimage';
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';
import { snakeCase } from '../supports';

class Manganato extends BaseKomik {
	website = 'https://manganato.com';
	lang = 'english';
	async latest() {
		const $ = await this.requestCheerio(this.website);
		const results: Komik[] = [];
		$('.content-homepage-item').each((i, el) => {
			results.push({
				img: $(el).find('img.img-loading').attr()!['src'],
				show: $(el).find('.content-homepage-item-right a:nth-child(1)').attr()!['href'],
				title: $(el).find('.content-homepage-item-right a:nth-child(1)').attr()!['title']
			});
		});
		return results;
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const keyword = searchParams.get('q') || '';
		// karena data tidak ditemukan ketika keyword kosong.maka kita kasih alternatif lain
		if (keyword === '') {
			return this.latest();
		}
		searchParams.delete('q');

		const link = new URL('https://manganato.com/search/story');
		link.pathname += '/' + snakeCase(keyword);
		link.search = searchParams.toString();
		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.search-story-item').each((i, el) => {
			results.push({
				img: $(el).find('img').attr()!['src'],
				show: $(el).find('.item-title').attr()!['href'],
				title: $(el).find('.item-title').text()
			});
		});
		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('.story-info-right h1').text();
		const img = $('.panel-story-info img').attr()!['src'];
		const chapters = await chapFuture;
		return {
			title,
			img,
			chapters
		};
	}
	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link);
		const chapters: Chapter[] = [];
		$('ul.row-content-chapter li a').each((i, el) => {
			chapters.push({
				title: $(el).text(),
				link: $(el).attr()!['href']
			});
		});
		return chapters;
	}
	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('.panel-chapter-info-top h1').text();

		const prevAttribute = $('.navi-change-chapter-btn-prev').attr();
		const prev = prevAttribute ? prevAttribute['href'] : null;

		// get from breadcrumbs
		const showLink = $('.panel-breadcrumb a:not(:first-child):not(:last-child)').attr()!['href'];
		const nextAttribute = $('.navi-change-chapter-btn-next').attr();
		const next = nextAttribute ? nextAttribute['href'] : null;

		const chapterImages: string[] = [];

		$('.container-chapter-reader img').each((i, el) => {
			const imageUrl = $(el).attr()!['src'];
			chapterImages.push(refererImage(imageUrl, chapter_link));
		});
		return {
			title,
			prev,
			showLink,
			next,
			chapterImages
		};
	}
}
export default Manganato.getInstance();
