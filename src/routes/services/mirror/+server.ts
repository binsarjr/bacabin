import { error, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, setHeaders, request }) => {
    let urlTarget = url.searchParams.get('url')
    const referrer = url.searchParams.get('referer')

    if (!urlTarget || !referrer)
        throw error(422, 'Mohon masukkan query string url dan referer')

    urlTarget = decodeURIComponent(urlTarget)




    let headers: any = {}


    for (const [key, value] of url.searchParams.entries()) {
        if (key !== 'url') headers[key] = decodeURIComponent(value)
           
    }

    const responseMirror = await fetch(urlTarget, { headers })
    headers = Object.fromEntries(responseMirror.headers)
    setHeaders(headers)

    const imageBlob = Buffer.from(await responseMirror.arrayBuffer())

    return new Response(imageBlob)
};

