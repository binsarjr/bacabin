import { refererImage } from '$lib/mirrorimage'
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik'
import type { ReadChapter } from '../BaseKomik/interfaces'

export class NgomikNet extends BaseKomik {
	website = 'https://ngomik.net/';
	name = 'Ngomik.Net';
	lang = 'indonesia';
	async latest(next = 1) {
		const link = new URL(this.website)
		if (next > 1) {
			link.pathname = '/manga/'
			link.searchParams.set('order', 'update')
			link.searchParams.set('page', next.toString())
		} else {
			link.pathname = '/'
		}
		const $ = await this.requestCheerioHumanoid(link.toString())
		const results: Komik[] = []
		$('.listupd > div').each((i, el) => {
			const img = $(el).find('img').attr()
			if (!img) return
			results.push({
				img: refererImage(img['src'], this.website),
				show: $(el).find('a:nth-child(1)').attr()!['href'],
				title: $(el).find('a:nth-child(1)').attr()!['title']
			})
		})
		return results
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const next = +(searchParams.get('next')?.toString() || '')
		if (next) return this.latest(next)

		const keyword = searchParams.get('q') || ''
		if (!keyword) return this.latest()

		searchParams.delete('q')
		searchParams.set('s', keyword)

		const link = new URL(this.website)
		link.search = searchParams.toString()
		const $ = await this.requestCheerioHumanoid(link.toString())
		const results: Komik[] = []
		$('.listupd > div').each((i, el) => {
			let img = $(el).find('img').attr()!['src']
			img = refererImage(img, link.toString())
			results.push({
				img,
				show: $(el).find('a:nth-child(1)').attr()!['href'],
				title: $(el).find('a:nth-child(1)').attr()!['title']
			})
		})
		return results
	}

	async show(link: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(link)
		const $ = await this.requestCheerio(link)
		const title = $('.entry-title').text()
		const img = refererImage($('.thumb img').attr()!['src'], link)
		const chapters = await chapFuture
		return {
			title,
			img,
			chapters
		}
	}
	async chapters(link: string): Promise<Chapter[]> {
		const $ = await this.requestCheerio(link)
		const chapters: Chapter[] = []
		$('#chapterlist ul > li a').each((i, el) => {
			const title = $(el).find('.chapternum').text().trim()
			if (!title) return
			chapters.push({
				title,
				link: $(el).attr()!['href']
			})
		})
		return chapters
	}
	async read(chapter_link: string): Promise<ReadChapter | null> {
		const $ = await this.requestCheerioHumanoid(chapter_link)
		const regexTsReader = /ts_reader\.run\((.*?)\);<\/script/i
		const data = JSON.parse($.html().match(regexTsReader)![1]) as {
			prevUrl: string
			nextUrl: string
			sources: {
				source: string
				images: string[]
			}[]
		}
		const title = $('.entry-title').text()

		const prev = data.prevUrl ? data.prevUrl : null

		const showLink = $('.headpost a').attr()!['href']
		const next = data.nextUrl ? data.nextUrl : null

		const chapterImages: string[] = data.sources[0].images.map((image) =>
			refererImage(image, chapter_link)
		)

		return {
			title,
			prev,
			showLink,
			next,
			chapterImages
		}
	}
}

export default NgomikNet.getInstance()
