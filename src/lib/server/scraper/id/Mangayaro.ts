import { refererImage } from "$lib/mirrorimage"
import { NgomikNet } from "$lib/server/scraper/id/NgomikNet"

class Mangayaro extends NgomikNet {
    website = 'https://www.mangayaro.net/';
    lang = 'indonesia';
    constructor () {
        super()
        super.website = this.website
        super.logo = refererImage('https://mangayaro.net/wp-content/uploads/2021/07/20210723_193720.png', this.website)
        super.name = "Komikkav"
        super.lang = this.lang
    }
}


export default new Mangayaro()