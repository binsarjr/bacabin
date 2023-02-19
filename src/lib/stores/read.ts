import { writable } from 'svelte/store'
import type { ReadChapter } from '../scraper/BaseKomik/interfaces'

export const readData = writable<ReadChapter | null>(null);
