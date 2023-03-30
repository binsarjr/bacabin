import { error, json, type RequestHandler } from '@sveltejs/kit'
import { getServerByKeyOrFail } from '../../../../../../../../../Workspace/BINSAR/program/bacabin/src/lib/scraper'
export const GET: RequestHandler = async ({params,url}) => {
	const server = getServerByKeyOrFail(params.server as string);

    const show = await server.show(params.show as string)
    if(!show) throw error(404,'Data tidak ditemukan')
    show.chapters = show.chapters.map(chapter => {
        const ref = new URL(url.toString())
        ref.pathname = '/services/'+params.server+'/read/'+chapter.link
        // @ts-ignore
        chapter['ref'] = ref

        return chapter
    })
    return json(show)
}