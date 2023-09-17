import { refererImage } from '$lib/mirrorimage'
import { error } from '@sveltejs/kit'
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik'
import type { ReadChapter } from '../BaseKomik/interfaces'

export class Akoma extends BaseKomik {
	website = 'https://akoma.xyz/';
	logo = 'https://akoma.xyz/_next/image?url=%2Fassets%2Flogo.png&w=256&q=75';
	lang = 'indonesia';
	langId = 'id'

	toImage(hash: string) {
		return `https://akoma.xyz/_next/image?url=https://paras-ipfs.paras.id/${hash}&w=256&q=75`
	}

	async nextPage(q: string, next: number) {

		const link = new URL('https://comic-api-mainnet.paras.id/comics?__skip=0&__limit=10&__sort=issued_at::-1&is_mobile_ready=true')
		if (q)
			link.searchParams.set('search', q)
		link.searchParams.set('__skip', ((next || 0) * 10).toString())

		const response = await this.request.get(link.toString(), {
			headers: {
				'accept-language': this.langId
			}
		}).json<{
			data: {
				results: {
					title: string,
					comic_id: string
					media: string
				}[]
			}
		}>()
		const results: Komik[] = response.data.results.map(result => ({
			img: this.toImage(result.media),
			title: result.title,
			show: result.comic_id
		}))

		return results
	}
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		const next = +(searchParams.get('next')?.toString() || '')
		const keyword = searchParams.get('q') || ''
		return this.nextPage(keyword, next || 0)
	}

	async show(comicId: string): Promise<KomikDetail | null> {
		const chapFuture = this.chapters(comicId)
		const link = new URL('https://comic-api-mainnet.paras.id/comics?is_mobile_ready=true')
		link.searchParams.set('comic_id', comicId)

		const response = await this.request.get(link.toString(), {
			headers: {
				'accept-language': this.langId
			}
		}).json<{
			data: {
				results: {
					title: string,
					comic_id: string
					media: string
				}[]
			}
		}>()

		if (!response.data.results.length) throw error(404)
		const item = response.data.results[0]

		const chapters: Chapter[] = await chapFuture
		return { title: item.title, img: this.toImage(item.media), chapters }
	}

	async chapters(comicId: string): Promise<Chapter[]> {
		const link = new URL('https://comic-api-mainnet.paras.id/public-non-series-chapters?is_mobile_ready=true')
		link.searchParams.set('comic_id', comicId)
		link.searchParams.set('__limit', '9999999999999')

		const response = await this.request.get(link.toString(), {
			headers: {
				'accept-language': this.langId
			}
		}).json<{
			data: {
				results: {
					metadata: {
						subtitle: string,
						comic_id: string
						media: string
					}
				}[]
			}
		}>()


		return response.data.results.map(result => ({
			title: result.metadata.subtitle,
			link: comicId
		}))
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
		const showLink = $('.ls1 a').attr()!['href']

		const chapterImages: string[] = []
		$('#imagenya-xiaomeng img').each((i, el) => {
			const onErrorAttr = $(el).attr()!.onerror.toString()

			let image = $(el).attr()!['src']
			if (onErrorAttr.includes('this.src')) {
				image = onErrorAttr.replace(/^this\.onerror=null;this\.src='/i, '').replace(/';$/i, '')
			}

			chapterImages.push(refererImage(image, chapter_link))
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

export default Akoma.getInstance()
