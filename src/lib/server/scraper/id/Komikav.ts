import { refererImage } from "$lib/mirrorimage"
import { NgomikNet } from "$lib/server/scraper/id/NgomikNet"

class Komikav extends NgomikNet {
    website = 'https://komikav.com/';
	lang = 'indonesia';    
    constructor() {
        super()
        super.website=this.website
        super.logo = refererImage('https://komikav.com/wp-content/uploads/2019/03/komikav_logo.png',this.website)
        super.lang=this.lang
    }
}


export default new Komikav()