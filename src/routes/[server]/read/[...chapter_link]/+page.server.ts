import { error, type Load } from '@sveltejs/kit'

import type { ReadChapter } from '$lib/scraper/BaseKomik/interfaces'

export const load: Load = async ({ params,url }) => {
	const item = async () => {
		const target = new URL(url.toString())
		target.pathname = '/services/' + params.server + '/read/' + params.chapter_link
		const resp = await fetch(target.toString())
		if(resp.status==404) throw error(404, 'Content Tidak ditemukan')
		const item:ReadChapter = await resp.json()
		return item
	}

	return { item: item(), server: params.server as string }
}
