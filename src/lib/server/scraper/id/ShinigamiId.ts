import { hapusPathTerakhir } from '$lib/server/scraper/supports';
import { load } from 'cheerio';
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

export class ShinigamiId extends BaseKomik {
	website = 'https://shinigami.sh/';
	name = 'shinigami.sh';
	logo = 'https://wuz.shinigami.id/wp-content/uploads/2022/03/20044501/11.png';
	lang = 'indonesia';

	async latest(next = 1) {
		const link = new URL(this.website);
		link.pathname = '/wp-admin/admin-ajax.php';

		const referer = new URL(this.website);
		referer.pathname = '/terbaru';
		referer.search = 'm_orderby=latest';

		const body = await this.fetchWithTimeout(link.toString(), {
			method: 'POST',
			headers: {
				// @ts-ignore
				referer: referer.toString(),
				'x-requested-with': 'XMLHttpRequest',
				'content-type': 'application/x-www-form-urlencoded'
			},
			// @ts-ignore
			body: `action=madara_load_more&page=${next}&template=madara-core%2Fcontent%2Fcontent-archive&vars%5Bpaged%5D=1&vars%5Borderby%5D=meta_value_num&vars%5Btemplate%5D=archive&vars%5Bsidebar%5D=full&vars%5Bmeta_query%5D%5B0%5D%5B0%5D%5Bkey%5D=_wp_manga_chapter_type&vars%5Bmeta_query%5D%5B0%5D%5B0%5D%5Bvalue%5D=manga&vars%5Bmeta_query%5D%5B0%5D%5Brelation%5D=AND&vars%5Bmeta_query%5D%5Brelation%5D=AND&vars%5Bpost_type%5D=wp-manga&vars%5Bpost_status%5D=publish&vars%5Bmeta_key%5D=_latest_update&vars%5Border%5D=desc`
		}).then((res) => res.text());
		const $ = load(body);
		console.log(body);

		const results: Komik[] = [];
		$('.page-item-detail').each((i, el) => {
			const img = $(el).find('img').attr()!['data-src'];
			results.push({
				img,
				show: $(el).find('.item-thumb a').attr()!['href'],
				title: $(el).find('.item-thumb a').attr()!['title']
			});
		});
		return results;
	}

	async homepage() {
		const $ = await this.requestCheerio(this.website);
		const results: Komik[] = [];
		$('.site-content .row .d-flex > div').each((i, el) => {
			const img = $(el).find('img').attr();
			if (!img) return;
			results.push({
				img: img['src'],
				show: $(el).find('.series-box a').attr()!['href'],
				title: $(el).find('.series-box a').text().trim()
			});
		});
		return results;
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const next = +(searchParams.get('next')?.toString() || '');
		console.log('next');
		if (next) return this.latest(next);
		console.log('search');

		const keyword = searchParams.get('q') || '';
		if (!keyword) return this.homepage();
		console.log('hmm');

		searchParams.delete('q');
		searchParams.set('s', keyword);
		searchParams.set('post_type', 'wp-manga');
		searchParams.set('op', '');
		searchParams.set('author', '');
		searchParams.set('artist', '');
		searchParams.set('release', '');
		searchParams.set('adult', '');

		const link = new URL(this.website);
		link.search = searchParams.toString();
		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.search-wrap  .row.c-tabs-item__content').each((i, el) => {
			const img = $(el).find('img').attr()!['data-src'];
			results.push({
				img,
				show: $(el).find('.tab-thumb a').attr()!['href'],
				title: $(el).find('.tab-thumb a').attr()!['title']
			});
		});
		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('.post-title').text();
		const img = $('.summary_image img').attr()!['data-src'];
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
		$('ul.version-chap > li a').each((i, el) => {
			const title = $(el).find('.chapter-manhwa-title').text().trim();

			chapters.push({
				title,
				link: $(el).attr()!['href']
			});
		});
		return chapters;
	}
	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('#chapter-heading').text();

		const prevAttr = $('a.btn.prev_page').attr();
		const prev = prevAttr ? prevAttr['href'] : null;
		const nextAttr = $('a.btn.next_page').attr();
		const next = nextAttr ? nextAttr['href'] : null;
		const showLink = hapusPathTerakhir(chapter_link);

		const chapterImages: string[] = [];

		$('.reading-content img').each((i, el) => {
			const image = $(el).attr()!['data-src'];
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

export default ShinigamiId.getInstance();
