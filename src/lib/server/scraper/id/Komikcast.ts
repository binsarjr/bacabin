import { refererImage } from "$lib/mirrorimage"
import type { Chapter, Komik, KomikDetail } from "$lib/server/scraper/BaseKomik"
import BaseKomik from "$lib/server/scraper/BaseKomik"
import type { ReadChapter } from "$lib/server/scraper/BaseKomik/interfaces"

class Komikcast extends BaseKomik {
    website = 'https://komikcast.site/';
    lang = 'indonesia';
    
    constructor () {
        super()
        super.logo = refererImage('https://komikcast.site/wp-content/uploads/2022/09/WMKCme.png', this.website)
    }
    async latest() {
        const $ = await this.requestCheerioHumanoid(this.website)
        const results: Komik[] = []
        $('.listupd.komikinfo .swiper-wrapper .splide-slide').each((i, el) => {
            const img = $(el).find('img').attr()
            if (!img) return
            results.push({
                img: refererImage(img['src'], this.website),
                show: $(el).find('a[title]').attr()['href'],
                title: $(el).find('a[title]').attr()['title']
            })
        })
        $('.listupd:not(.komikinfo) > div').each((i, el) => {
            const img = $(el).find('img').attr()
            if (!img) return
            results.push({
                img: refererImage(img['src'], this.website),
                show: $(el).find('a[href]:nth-child(1)').attr()['href'],
                title: $(el).find('a h3').text()
            })
        })
        return results
    }

    async list(searchParams: URLSearchParams): Promise<Komik[]> {
        const keyword = searchParams.get('q') || ''
        if (!keyword) return this.latest()

        searchParams.delete('q')
        searchParams.set('s', keyword)

        const link = new URL(this.website)
        link.search = searchParams.toString()
        const $ = await this.requestCheerioHumanoid(link.toString())
        const results: Komik[] = []
        $('.list-update_items-wrapper.search-item > div').each((i, el) => {
            let img = $(el).find('img').attr()['src']
            img = refererImage(img, link.toString())
            results.push({
                img,
                show: $(el).find('a:nth-child(1)').attr()['href'],
                title: $(el).find('a:nth-child(1) h3').text().trim()
            })
        })
        return results
    }
    async show(link: string): Promise<KomikDetail | null> {
        const chapFuture = this.chapters(link)
        const $ = await this.requestCheerio(link)
        const title = $('.komik_info-content-body-title').text()
        const img = refererImage($('.komik_info-content-thumbnail > img').attr()['src'], link)
        const chapters = await chapFuture
        return {
            title,
            img,
            chapters
        }
    }
    async chapters(link: string): Promise<Chapter[]> {
        const $ = await this.requestCheerio(link)
        const chapters: Chapter[] = []
        $('ul#chapter-wrapper > li a').each((i, el) => {
            const title = $(el).text().trim()
            if (!title) return
            chapters.push({
                title,
                link: $(el).attr()['href']
            })
        })
        return chapters
    }
    async read(chapter_link: string): Promise<ReadChapter | null> {
        const $ = await this.requestCheerioHumanoid(chapter_link)
        const title = $('.chapter_headpost h1').text()


        const prevAttribute = $('.nextprev a[rel="prev"][href]').attr()
        const prev = prevAttribute ? prevAttribute['href'] : null

        const showLink = $('.chapter_headpost a[href]').attr()['href']
        const nextAttribute = $('.nextprev a[rel="next"][href]').attr()
        const next = nextAttribute ? nextAttribute['href'] : null

        const chapterImages: string[] = []

        $('.main-reading-area img').each((i, el) => {
            chapterImages.push(refererImage($(el).attr()['src'], chapter_link))
        })

        return {
            title,
            prev,
            showLink,
            next,
            chapterImages
        }
    }
}


export default Komikcast.getInstance()