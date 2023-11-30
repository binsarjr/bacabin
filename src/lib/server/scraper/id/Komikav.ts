import { refererImage } from '$lib/mirrorimage';
import { NgomikNet } from '$lib/server/scraper/id/NgomikNet';

class Komikav extends NgomikNet {
	website = 'https://komikav.com/';
	lang = 'indonesia';
	constructor() {
		super();
		super.website = this.website;
		super.logo = refererImage({
			url: 'https://komikav.com/wp-content/uploads/2019/03/komikav_logo.png',
			referer: this.website
		});
		super.name = 'Komikkav';
		super.lang = this.lang;
	}
}

export default new Komikav();
