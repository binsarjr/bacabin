
import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	event.depends('reading')

	const item = await router.createCaller(await createContext(event)).read({
		chapterLink: event.params.chapter_link,
		server: event.params.server,
	})

	if (!item) throw error(404)

	return {
		item,
		server: event.params.server as string
	}
}
