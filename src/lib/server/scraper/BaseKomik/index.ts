/* eslint-disable @typescript-eslint/ban-ts-comment */
import Cheerio from 'cheerio'
import { gotScraping } from 'got-scraping'
import type { IBaseKomik, ReadChapter } from './interfaces'
import type { Chapter, Komik, KomikDetail } from './types'
// @ts-ignore
import humanoid from 'humanoid-js'
export * from './types'

// let tunnelingAgent = tunnel.httpsOverHttp({
//   proxy: {
//     host: '113.161.131.43',
//     port: 80
//   }})
export default class BaseKomik implements IBaseKomik {
	name: string
	website = '(unkown)';
	logo = '';
	lang = 'indonesia';
	constructor () {
		this.name ||= this.constructor.name
	}
	toLink(pathname: string) {
		const link = new URL(this.website)
		link.pathname = pathname
		return link.toString()
	}

	static instance: IBaseKomik
	static getInstance() {
		if (this.instance) return this.instance
		this.instance = new this()
		return this.instance
	}

	protected readonly requestHumanoid = new humanoid();

	protected readonly request = gotScraping.extend({
		timeout: {
			request: 10_000
		}
		// agent: {
		// 	http: tunnelingAgent,
		// 	// https: tunnelingAgent,
		// },
		// http2:true
	});
	protected readonly requestCheerioHumanoid = async (link: string) => {
		const resp = await this.requestHumanoid.get(new URL(link).toString())
		const text = resp.body
		return Cheerio.load(text)
	};
	protected readonly requestCheerio = async (link: string) => {
		const text = await this.request.get(new URL(link).toString()).text()
		return Cheerio.load(text)
	};
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		return []
	}
	async show(link: string): Promise<KomikDetail | null> {
		return null
	}

	async chapters(link: string): Promise<Chapter[]> {
		return []
	}
	async read(chapter_link: string): Promise<ReadChapter | null> {
		return {
			title: '',
			chapterImages: [],
			next: null,
			prev: null,
			showLink: null
		}
	}

	toObject() {
		return {
			name: this.constructor.name,
			website: this.website,
			logo: this.logo,
			lang: this.lang
		}
	}
}
