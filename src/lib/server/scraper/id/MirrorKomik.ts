import { refererImage } from '$lib/mirrorimage';
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class MirrorKomik extends BaseKomik {
	website = 'https://mirrorkomik.net/';
	lang = 'indonesia';

	async nextPage(next: number) {
		const link = new URL(this.website);
		link.pathname = '/list-update';
		link.searchParams.set('page_komik_info', next.toString());

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = [];
		$('.flexbox3 .flexbox3-item').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr()!;
			const img = refererImage({ url: $(el).find('img').attr()!['src'], referer: link.toString() });
			results.push({
				show: this.toLink(anchorAttribute['href']),
				title: anchorAttribute['title'].replace(/^komik\s+/i, ''),
				img
			});
		});

		return results;
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const next = +(searchParams.get('next')?.toString() || '');
		if (next) return this.nextPage(next);

		const keyword = searchParams.get('q') || '';
		searchParams.delete('q');
		const link = new URL(this.website);
		link.pathname = '/cari';
		searchParams.set('s', keyword);
		link.search = searchParams.toString();

		const $ = await this.requestCheerio(link.toString());
		const results: Komik[] = keyword ? [] : await this.nextPage(next || 1);
		$('.animepost .animposx').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr()!;
			const img = refererImage({
				url: $(el).find('img').attr()!['data-src'],
				referer: link.toString()
			});
			results.push({
				show: this.toLink(anchorAttribute['href']),
				title: anchorAttribute['title'].replace(/^komik\s+/i, ''),
				img
			});
		});

		return results;
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link);
		const $ = await this.requestCheerio(link);
		const title = $('article .inftable tr:nth-child(1) td:nth-child(2)')
			.text()
			.replace(/^komik\s+/i, '');

		const img = refererImage({ url: $('article .ims img').attr()!['src'], referer: link });

		const chapters: Chapter[] = await chapFuture;
		return { title, img, chapters };
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link);
		const chapters: Chapter[] = [];
		$('#Chapter li').each((i, el) => {
			chapters.push({
				link: this.toLink($(el).find('a').attr()!['href']),
				title: `Chapter ${$(el)
					.find('a')
					.text()
					.replace(/^ch\.\s+/i, '')}`
			});
		});
		return chapters;
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link);
		const title = $('#Deskripsi h1').text();

		let prev = null;
		let next = null;
		const showLink = this.toLink(
			$('#Chapter_Lainnya tr:last-child .judulseries a').attr()!['href']
		);
		$('#Deskripsi a').each((index, element) => {
			const spans = $(element).find('span'); // Find 'span' elements within the 'a' tag
			const spanContents = spans.map((i, span) => $(span).text()).get(); // Get the text content of each 'span' element

			if (spanContents.includes('Balik')) {
				prev = this.toLink($(element).attr('href') || '');
				return;
			}
			if (spanContents.includes('Lanjut')) {
				next = this.toLink($(element).attr('href') || '');
				return;
			}
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
		let [_, id, id2] = $('#thisch')
			.attr('onclick')
			?.replace(/^\w+/, '')
			.replace(/^\(/, '')
			.replace(/\)$/, '')
			.split(',') as [string, string, string];
		id = id.replace(/'/g, '');
		id2 = id2.replace(/'/g, '');

		const chapLink = `https://mirrorkomik.net/Chapter/listchap,${id},${id2}`;
		const chapterImages: string[] = (
			await this.fetchWithTimeout(chapLink, {
				headers: {
					// @ts-ignore
					referer: chapter_link,
					'x-requested-with': 'XMLHttpRequest'
				}
			}).then((re) => re.json())
		).map((img: string) => {
			const imgurl = new URL(img);
			const webUrl = new URL(this.website);
			if (imgurl.hostname == webUrl.hostname)
				img = refererImage({ url: img, referer: chapter_link });
			return img;
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

export default MirrorKomik.getInstance();

// komikav: Komikav,
// mangayaro: Mangayaro
