import { refererImage } from '$lib/mirrorimage'
import BaseKomik, { type Chapter, type Komik, type KomikDetail } from '../BaseKomik'
import type { ReadChapter } from '../BaseKomik/interfaces'

export class WebtoonEnglishClass extends BaseKomik {
    name = "Webtoon English"
    website = 'https://www.webtoons.com/en';
    lang = 'english';
    async homepage() {

        const results: Komik[] = []

        const $ = await this.requestCheerio(this.website)
        $('.card_lst li').each((i, el) => {
            const anchorAttribute = $(el).find('a').attr()
            const img = $(el).find('img').attr()['src']

            let show = anchorAttribute['href']
            try {
                new URL(show)
            } catch (error) {
                show = `https://www.webtoons.com${anchorAttribute['href']}`
            }

            results.push({
                show,
                title: $(el).find('p.subj').text(),
                img: refererImage(img, this.website)
            })
        })
        return results
    }
    async list(searchParams: URLSearchParams): Promise<Komik[]> {
        const keyword = searchParams.get('q') || ''
        if (!keyword) return this.homepage()
        searchParams.delete('q')

        const urlSearch = new URL(this.website)
        urlSearch.pathname = `${urlSearch.pathname.replace(/\/$/, '')}/search`


        const link = new URL(urlSearch.toString())
        searchParams.set('keyword', keyword)
        link.search = searchParams.toString()

        const $ = await this.requestCheerio(link.toString())
        const results: Komik[] = []
        $('.card_lst li').each((i, el) => {
            const anchorAttribute = $(el).find('a').attr()
            const img = $(el).find('img').attr()['src']
             let show = anchorAttribute['href']
            try {
                new URL(show)
            } catch (error) {
                show = `https://www.webtoons.com${anchorAttribute['href']}`
            }
            results.push({
                show,
                title: $(el).find('p.subj').text(),
                img: refererImage(img, link.toString())
            })
        })

        return results
    }

    async show(link: string): Promise<KomikDetail | null> {
        const $ = await this.requestCheerio(link)
        const title = $('.detail_header .info .subj').text()
        const img = $('.detail_header .thmb img').attr()['src']

        const chapters: Chapter[] = await this.chapters(link)
        return { title, img: refererImage(img, link), chapters }
    }


    async chapters(link: string): Promise<Chapter[]> {
        const $ = await this.requestCheerio(link)
        const chapters: Chapter[] = []
        $('#_listUl li').each((i, el) => {
            chapters.push({
                link: $(el).find('a').attr()['href'],
                title: $(el).find('.subj').text()
            })
        })
        return chapters
    }

    async read(chapter_link: string): Promise<ReadChapter | null> {
        const $ = await this.requestCheerio(chapter_link)
        const title = $('.subj_info')
            .text()

        const prevAttr = $('.paginate.v2 a.pg_prev').attr()
        const prev = prevAttr ? prevAttr['href'] : null
        const nextAttr = $('.paginate.v2 a.pg_next').attr()
        const next = nextAttr ? nextAttr['href'] : null
        const showLink = $('.subj_info a').attr()['href']

        const chapterImages: string[] = []
        $('#_imageList img').each((i, el) => {
            const image = $(el).attr()['data-url']

            chapterImages.push(refererImage(image, chapter_link))
        })
        return {
            title,
            next,
            prev,
            chapterImages,
            showLink
        }
    }
}

export default WebtoonEnglishClass.getInstance()
