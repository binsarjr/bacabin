import type { Load } from "@sveltejs/kit";

export interface BreadcrumbMenu {
    text: string
    link: string
}

export const load: Load = ({ url }) => {
    const breadcrumbs: BreadcrumbMenu[] = [{
        link: '/',
        text: 'BACABIN'
    }]
    let lastUrl = '/'
    for (const pathurl of url.pathname.split('/').filter(Boolean)) {
        lastUrl += pathurl + '/'
        breadcrumbs.push({
            link: lastUrl,
            text: pathurl.toString().replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
        })
    }

    return {
        breadcrumbs
    }
}