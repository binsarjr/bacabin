import { json, type RequestHandler } from '@sveltejs/kit'
import { getServerByKeyOrFail } from '../../../../../../../../../../Workspace/BINSAR/program/bacabin/src/lib/scraper'

export const GET: RequestHandler = async ({params,url}) => {
	const server = getServerByKeyOrFail(params.server as string);

    const resp = await server.read(params.chapter_link as string)
    return json(resp)
}