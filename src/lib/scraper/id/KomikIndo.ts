import BaseKomik, { type Komik } from '../BaseKomik';

class KomikIndo extends BaseKomik {
	async list(keyword: string = ''): Promise<Komik[]> {
		const link = new URL('https://komikindo.id/?s=')
		link.searchParams.set('s', keyword)

		const $ = await this.requestCheerio(link.toString())
		const results: Komik[] = []
		$('.animepost').each((i, el) => {
			const anchorAttribute = $(el).find('a').attr()
			const img = $(el).find('img').attr()['src']
			results.push({
				show: anchorAttribute['href'],
				title: anchorAttribute['title'],
				img,
			})
		})

		return results
	}
}

export default KomikIndo.getInstance()