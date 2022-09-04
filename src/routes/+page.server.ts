import komikindo from "$lib/scraper/id/komikindo";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    console.log(await komikindo.list('a'))
}