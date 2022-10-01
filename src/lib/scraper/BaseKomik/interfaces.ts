import type { Chapter, Komik, KomikDetail } from './types';

export interface IBaseKomikProperty {
	name: string;
	logo: string;
	website: string;
}

export interface ReadChapter {
	title: string;
	chapterImages: string[];
	prev: string | null;
	showLink: string | null;
	next: string | null;
}

export interface IBaseKomik extends IBaseKomikProperty {
	list(searchParams: URLSearchParams): Promise<Komik[]>;
	show(link: string): Promise<KomikDetail | null>;
	chapters(link: string): Promise<Chapter[]>;
	read(chapter_link: string): Promise<ReadChapter | null>;
	toObject(): IBaseKomikProperty;
}
