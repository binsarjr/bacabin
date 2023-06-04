import { NgomikNet } from "$lib/server/scraper/id/NgomikNet"

class Kiryuu extends NgomikNet {
    website = 'https://kiryuu.id';
	logo = 'https://kiryuu.id/wp-content/uploads/2021/05/logo-kiryuu-219671-d1yvN4qK.png'
	lang = 'indonesia';    
    constructor() {
        super()
        super.website=this.website
        super.logo = this.logo
        super.lang=this.lang
    }
}


export default new Kiryuu()