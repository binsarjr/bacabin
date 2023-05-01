import { writable } from 'svelte/store'
import type { ReadChapter } from '../scraper/BaseKomik/interfaces'

export interface DataReader {
	navigation: {
		prev: string | null;
		next: string | null;
		chapterList: string | null;
	};
	item: ReadChapter;
}

export const readData = writable<DataReader|null>(null);
