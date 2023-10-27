import { refererImage } from '$lib/mirrorimage';
import { NgomikNet } from '$lib/server/scraper/id/NgomikNet';

class Mangayaro extends NgomikNet {
	website = 'https://www.mangayaro.id/';
	lang = 'indonesia';
	constructor () {
		super();
		super.website = this.website;
		super.logo = refererImage({
			url:
				'https://mangayaro.net/wp-content/uploads/2021/07/20210723_193720.png',
			referer: this.website
		}
		);
		super.name = 'Komikkav';
		super.lang = this.lang;
	}
}

export default new Mangayaro();
