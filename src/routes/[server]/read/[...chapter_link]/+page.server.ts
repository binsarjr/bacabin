import { getServerByKeyOrFail } from "$lib/scraper";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
    const server = getServerByKeyOrFail(params.server as string)
    const item = await server.read(params.chapter_link as string)
    return { item, server: params.server as string }
}