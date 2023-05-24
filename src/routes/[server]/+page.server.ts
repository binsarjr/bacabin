import { getServerByKeyOrFail } from '$lib/server/scraper'
import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const server = getServerByKeyOrFail(event.params.server as string)
	const q = event.url.searchParams.get('q') || ''
	try {
		const lists = await router.createCaller(await createContext(event)).list({
			server: event.params.server || '',
			search: q||undefined
		})
		return { lists, server: server.toObject(), q }
	} catch (e) {
		throw error(500, e?.toString())
	}
}
