/* eslint-disable @typescript-eslint/ban-ts-comment */
import Cheerio from 'cheerio';
import type { IBaseKomik, ReadChapter } from './interfaces';
import type { Chapter, Komik, KomikDetail } from './types';
export * from './types';

export default class BaseKomik implements IBaseKomik {
	name: string;
	website = '(unkown)';
	logo = '';
	lang = 'indonesia';
	constructor() {
		this.name ||= this.constructor.name;
	}
	toLink(pathname: string) {
		const link = new URL(this.website);
		link.pathname = pathname;
		return link.toString();
	}

	static instance: IBaseKomik;
	static getInstance() {
		if (this.instance) return this.instance;
		this.instance = new this();
		return this.instance;
	}

	readonly fetchWithTimeout = async (
		url: string | URL,
		options?: Request & { timeout: number }
	) => {
		const timeout = options?.timeout || 10_000;

		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);

		const response = await fetch(url.toString(), {
			...options,
			signal: controller.signal
		});
		clearTimeout(id);

		return response;
	};

	protected readonly requestCheerio = async (link: string) => {
		const text = await this.fetchWithTimeout(link.toString()).then((res) => res.text());

		return Cheerio.load(text);
	};
	async list(searchParams: URLSearchParams): Promise<Komik[]> {
		return [];
	}
	async show(link: string): Promise<KomikDetail | null> {
		return null;
	}

	async chapters(link: string): Promise<Chapter[]> {
		return [];
	}
	async read(chapter_link: string): Promise<ReadChapter | null> {
		return {
			title: '',
			chapterImages: [],
			next: null,
			prev: null,
			showLink: null
		};
	}

	toObject() {
		return {
			name: this.constructor.name,
			website: this.website,
			logo: this.logo,
			lang: this.lang
		};
	}
}
