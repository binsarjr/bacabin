import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const q = event.url.searchParams.get('q') || ''
	const {lists,server} = await router.createCaller(await createContext(event)).quicksearch(
		{
			keyword: q || '',
			languages: event.url.searchParams.getAll('lang'),
			servers: event.url.searchParams.getAll('server'),
		}
	)
	const serverLanguages = await router.createCaller(await createContext(event)).serverLanguages()
	return { lists,server, serverLanguages, q }

}
