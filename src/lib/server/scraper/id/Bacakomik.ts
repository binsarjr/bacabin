import { refererImage } from '$lib/mirrorimage';
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik';
import type { ReadChapter } from '../BaseKomik/interfaces';

class Bacakomik extends BaseKomik {
	website = 'https://bacakomik.me/';
	logo = 'https://i0.wp.com/menantuincaran.lol/bapuk/2020/09/bacakomikv2.png';
	lang = 'indonesia';

	async nextPage(next: number) {

		const link = new URL(this.website)
		link.pathname = '/komik-terbaru/page/' + next

		const $ = await this.requestCheerio(link.toString())
		const results: Komik[] = []
		$('.animepost').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr()!
			const img = refererImage({ url: $(el).find('img').attr()!['src'], referer: link.toString() })
			results.push({
				show: anchorAttribute['href'],
				title: anchorAttribute['title'].replace(/^komik\s+/i, ''),
				img
			})
		})

		return results
	}
	async search(link: URL): Promise<Komik[]> {

		const $ = await this.requestCheerio(link.toString())
		const results: Komik[] = []
		$('.animepost').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr()!
			const img = refererImage({ url: $(el).find('img').attr()!['src'], referer: link.toString() })
			results.push({
				show: anchorAttribute['href'],
				title: anchorAttribute['title'].replace(/^komik\s+/i, ''),
				img
			})
		})

		return results
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const next = +(searchParams.get('next')?.toString() || '')
		if (next) return this.nextPage(next)


		const keyword = searchParams.get('q') || ''
		searchParams.delete('q')
		const link = new URL(this.website)
		searchParams.set('s', keyword)
		link.search = searchParams.toString()
		return this.search(link)

	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link)
		const $ = await this.requestCheerio(link)
		const title = $('.infoanime h1.entry-title')
			.text()
			.replace(/^komik\s+/i, '')
		const img = $('.infoanime .thumb img').attr()!['src']

		const chapters: Chapter[] = await chapFuture
		return { title, img, chapters }
	}

	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link)
		const chapters: Chapter[] = []
		$('#chapter_list li').each((i, el) => {
			chapters.push({
				link: $(el).find('a chapter').parent().attr()!['href'],
				title: `Chapter ${$(el).find('a chapter').text()}`
			})
		})
		return chapters
	}

	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerio(chapter_link)
		const title = $('.chapter-content h1.entry-title')
			.text()
			.replace(/^komik\s+/i, '')

		const prevAttr = $('.nextprev:first-child a:first-child[rel="prev"]').attr()
		const prev = prevAttr ? prevAttr['href'] : null
		const nextAttr = $('.nextprev:first-child a:last-child[rel="next"]').attr()
		const next = nextAttr ? nextAttr['href'] : null
		const showLink = $('.nextprev:first-child a .daftarch').parent().attr()!['href']

		const chapterImages: string[] = []
		$('#imagenya-xiaomeng img').each((i, el) => {
			const onErrorAttr = $(el).attr()!.onerror.toString()

			let image = $(el).attr()!['src']
			if (onErrorAttr.includes('this.src')) {
				image = onErrorAttr.replace(/^this\.onerror=null;this\.src='/i, '').replace(/';$/i, '')
			}

			chapterImages.push(refererImage({ url: image, referer: chapter_link }))
		})
		return {
			title,
			next,
			prev,
			chapterImages,
			showLink
		}
	}
}

export default Bacakomik.getInstance()
