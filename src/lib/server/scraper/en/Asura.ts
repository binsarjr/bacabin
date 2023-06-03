import { refererImage } from '$lib/mirrorimage'
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik'
import type { ReadChapter } from '../BaseKomik/interfaces'

class Asura extends BaseKomik {
	website = 'https://asura.gg/';
	// logo = 'https://asura.gg/wp-content/uploads/2021/03/Group_1.png';
	name = "Asura"
	lang = 'english';
	async latest() {
		const $ = await this.requestCheerio(this.website);
		const results: Komik[] = [];
		$('.listupd > div').each((i, el) => {
			const img = $(el).find('img').attr();
			if (!img) return;
			results.push({
				img: img['src'],
				show: $(el).find('a:nth-child(1)').attr()['href'],
				title: $(el).find('a:nth-child(1)').attr()['title']
			});
		});
		return results;
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const keyword = searchParams.get('q') || '';
		if (!keyword) return this.latest();

		searchParams.delete('q');
		searchParams.set('s', keyword);

		const link = new URL(this.website);
		link.search = searchParams.toString();
		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.listupd > div').each((i, el) => {
			results.push({
				img: $(el).find('img').attr()['src'],
				show: $(el).find('a:nth-child(1)').attr()['href'],
				title: $(el).find('a:nth-child(1)').attr()['title']
			});
		});
		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('.entry-title').text();
		const img = $('.thumb img').attr()['src'];
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
		$('#chapterlist ul > li a').each((i, el) => {
			chapters.push({
				title: $(el).find('.chapternum').text(),
				link: $(el).attr()['href']
			});
		});
		return chapters;
	}
	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('.entry-title').text();

		const prevAttribute = $('.ch-prev-btn:not(.disabled)').attr();
		const prev = prevAttribute ? prevAttribute['href'] : null;

		const showLink = $('.headpost a').attr()['href'];
		const nextAttribute = $('.ch-next-btn:not(.disabled)').attr();
		const next = nextAttribute ? nextAttribute['href'] : null;

		const chapterImages: string[] = [];

		$('#readerarea img').each((i, el) => {
			const imageUrl = $(el).attr()['src'];
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
export default Asura.getInstance();
