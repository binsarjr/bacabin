import { writable } from "svelte-local-storage-store";
import type { Writable } from "svelte/store";

interface IHistory {
    id: string
    server: string
    title: string,
    link: string
}

export const historyKomik: Writable<IHistory[]> = writable("history", []);
export const historyChapter: Writable<IHistory[]> = writable("historychapter", []);