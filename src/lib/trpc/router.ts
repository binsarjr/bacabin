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
        })
});

