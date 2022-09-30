import { error, type RequestHandler } from "@sveltejs/kit"

// example /mirror?url=http://example.com/images.jpg&referer=http://example.com/images
export const GET: RequestHandler = async ({ url }) => {

    let urlTarget = url.searchParams.get('url')

    if (!urlTarget || !url.searchParams.get('referer')) throw error(422, "Mohon masukkan query string url dan referer")

    urlTarget = decodeURIComponent(urlTarget)

    const headers: { [i: string]: string } = {}

    for (const [key, value] of url.searchParams.entries()) {
        if (key !== 'url') headers[key] = decodeURIComponent(value)
    }


    const responseMirror = await fetch(urlTarget, { headers })
    const imageBlob = Buffer.from(await responseMirror.arrayBuffer())


    return new Response(imageBlob)
}