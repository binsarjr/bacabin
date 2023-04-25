import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik'
import type { ReadChapter } from '../BaseKomik/interfaces'

class Komiku extends BaseKomik {
	website = 'https://komiku.id/';
	lang = 'indonesia';
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const link = new URL('https://data.komiku.id/cari/?post_type=manga&s=');
		searchParams.set('s', searchParams.get('q') || '');
		searchParams.set('post_type', 'manga');
		searchParams.delete('q');
		link.search = searchParams.toString();

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.daftar > div').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr();
			const img = $(el).find('img').attr()['data-src'];
			results.push({
				show: anchorAttribute['href'],
				title: $(el).find('h3').text().trim(),
				img
			});
		});
		

		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerioHumanoid(link);
		const title = $('#Judul h1')
			.text().trim()
			
		const img = $('#Informasi img').attr()['src'];

		const chapters: Chapter[] = (await chapFuture).map(chapter => {
			let targetLink=new URL(link);
			targetLink.pathname=chapter.link
			
			chapter.link=targetLink.toString()
			return chapter
		});
		return { title, img, chapters };
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerioHumanoid(link);
		const chapters: Chapter[] = [];
		$('#Daftar_Chapter td.judulseries').each((i, el) => {
			chapters.push({
				link: $(el).find('a').attr()['href'],
				title: $(el).find('a').text().trim()
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerioHumanoid(chapter_link);
		const title = $('#Judul h1')
			.text().trim()


		const baseLink = new URL(chapter_link);

		const prevAttr = $('.nxpr a [data-icon="caret-left"]').parent().attr()
		const nextAttr = $('.nxpr a [data-icon="caret-right"]').parent().attr()

		let prev =  null;
		if(prevAttr) {
			baseLink.pathname = prevAttr['href']
			prev=baseLink.toString()
		}

		let next =  null;
		if(nextAttr) {
			baseLink.pathname = nextAttr['href']
			next=baseLink.toString()
		}

		baseLink.pathname=$('#setting a').attr()['href'];
		const showLink = baseLink.toString()

		const chapterImages: string[] = [];

		$('#Baca_Komik img').each((i, el) => {
			let image = $(el).attr()['src'];
		

			chapterImages.push(image);
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

export default Komiku.getInstance();
