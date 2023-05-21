import { getServerByKeyOrFail } from "$lib/scraper"
import { t } from "$lib/trpc/t"
import { z } from 'zod'

export const router = t.router({
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

