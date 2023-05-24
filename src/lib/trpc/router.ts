import { getServerByKeyOrFail, servers } from "$lib/server/scraper"
import type { Komik } from "$lib/server/scraper/BaseKomik/types"
import { t } from "$lib/trpc/t"
import { z } from 'zod'

export const router = t.router({
    servers: t.procedure.query(async () => {
        const lists: string[] = []
        Object.entries(servers).map(([key, server]) => {
            if (!lists.includes(key)) lists.push(key)
        })
        return lists
    }),
    serverLanguages: t.procedure.query(async () => {
        const languages: string[] = []
        Object.entries(servers).map(([key, server]) => {
            if (!languages.includes(server.lang)) languages.push(server.lang)
        })
        return languages
    }),
    // cari komik berdasarkan server tercepat
    quicksearch: t.procedure.input(z.object({
        keyword: z.string(),
        languages: z.array(z.string()).optional(),
        servers: z.array(z.string()).optional()
    })).query(async ({ input: { keyword, languages, servers: inputServers } }) => {
        const searchParams = new URLSearchParams()
        if (keyword) searchParams.set('q', keyword)
        try {
            const response = await Promise.any(Object.entries(servers).map(async ([key, server]) => {
                if (languages?.length) {
                    if (!languages.includes(server.lang)) throw new Error(server.name + " Language tidak sesuai")
                }
                if (inputServers?.length) {
                    if (!inputServers.includes(key)) throw new Error(server.name + " tidak sesuai")
                }
                const lists = await server.list(searchParams)
                if (lists.length == 0) throw new Error("Data di server " + server.name + " TIdak ditemukan")
                return { lists, server: key }
            }))
            return response
        } catch (error) {
            return { lists: [] as Komik[], server: undefined }
        }

    }),
    list: t.procedure
        .input(z.object({
            search: z.string().optional(),
            server: z.string().transform((val) => getServerByKeyOrFail(val))
        }))
        .query(async ({ input }) => {
            const searchParams = new URLSearchParams()
            if (input.search) searchParams.set('q', input.search)
            return input.server.list(searchParams)
        }),
    show: t.procedure
        .input(z.object({
            show: z.string(),
            server: z.string().transform((val) => getServerByKeyOrFail(val))
        }))
        .query(async ({ input }) => {
            return input.server.show(input.show)
        }),
    read: t.procedure
        .input(z.object({
            chapterLink: z.string(),
            server: z.string().transform((val) => getServerByKeyOrFail(val))
        }))
        .query(async ({ input }) => {
            return input.server.read(input.chapterLink)
        })
});

