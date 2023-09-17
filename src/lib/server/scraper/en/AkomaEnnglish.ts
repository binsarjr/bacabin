import { Akoma } from '$lib/server/scraper/id/AkomaIndonesia'

class AkomaEnnglish extends Akoma {
	constructor () {
		super()
		super.lang = 'english'
		super.langId = 'en'
	}

}

export default new AkomaEnnglish()
