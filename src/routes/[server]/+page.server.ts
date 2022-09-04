import BaseKomik from "$lib/scraper/BaseKomik";
import type { IBaseKomik } from "$lib/scraper/BaseKomik/interfaces";
import KomikIndo from "$lib/scraper/id/KomikIndo";

import type { ServerList } from "$lib/scraper/types/Server";
import { error, type Action, type Load } from "@sveltejs/kit";

export const load: Load = async ({ params, url, parent, depends }) => {
    const servers: { [i: ServerList]: IBaseKomik } = {
        komikindo: KomikIndo,
    }
    let server = servers[params.server as string]
    if (!server) throw error(404)
    const lists = await server.list(url.searchParams.get('q') || '')
    return { lists, server: server.toObject() }

}