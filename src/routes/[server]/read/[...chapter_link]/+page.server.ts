import { getServerByKeyOrFail } from "$lib/scraper";
import { error, type Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
    const server = getServerByKeyOrFail(params.server as string)
    const item = await server.read(params.chapter_link as string)
    if(!item) throw error(404,"Content Tidak ditemukan")
    return { item, server: params.server as string }
}