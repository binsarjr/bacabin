import { NgomikNet } from '$lib/server/scraper/id/NgomikNet';

class Kiryuu extends NgomikNet {
	website = 'https://kiryuu.id';
	logo = 'https://kiryuu.id/wp-content/uploads/2021/05/logo-kiryuu-219671-d1yvN4qK.png';
	lang = 'indonesia';
	constructor() {
		super();
		// @ts-ignore
		super.website = this.website;
		// @ts-ignore

		super.logo = this.logo;
		// @ts-ignore
		super.lang = this.lang;
		// @ts-ignore
		super.name = 'Kiryuu';
	}
}

export default new Kiryuu();
