import { error, type Load } from '@sveltejs/kit'

import type { KomikDetail } from '$lib/scraper/BaseKomik'


export const load: Load = async ({ params, url }) => {
	try {
		const target = new URL(url.toString())
		target.pathname = '/services/' + params.server + '/' + params.show
		const resp = await fetch(target.toString())

		if (resp.status == 404) throw error(404, 'Data tidak ditemukan')

		let item: KomikDetail = await resp.json()
		return {
			item,
			server: params.server as string,
			show: params.show as string
		}
	} catch (e) {
		throw error(500, 'Gagal mengambil resources ke server yang di tuju')
	}
}
