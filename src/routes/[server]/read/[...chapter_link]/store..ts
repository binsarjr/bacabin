import { writable } from 'svelte/store';
import type { ReadChapter } from '../../../../lib/scraper/BaseKomik/interfaces';

export const readData = writable<ReadChapter | null>(null);
