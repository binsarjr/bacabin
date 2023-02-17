import { writable } from 'svelte-local-storage-store';

export const chapterLink = writable('image-cache.chapter-link', '');
export const chapterImagesStore = writable<string[]>('image-cache.chapter-images', []);
