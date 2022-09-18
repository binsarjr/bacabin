import EventEmitter from "events";

export const waitImgLoaded = (image: HTMLImageElement) => new Promise((resolve) => {
    image.onload = event => {
        var isLoaded = image.complete && image.naturalHeight !== 0;
        isLoaded && resolve(isLoaded)
    }
})

const imgEvent = new EventEmitter()

export const imgLazyLoadingStop = () => imgEvent.emit('done')

export const imgLazyLoading = async () => {
    let isDone = false
    imgEvent.on('done', _ => {
        isDone = true
    })
    document.querySelectorAll('img[data-src]').forEach((_) => {
        const el = _ as HTMLImageElement
        if (!el.src) el.src = '/loading.gif'
        // Read More: http://afarkas.github.io/lazysizes
        el.classList.add('lazyload')
        // Read More: https://web.dev/browser-level-image-lazy-loading/
        el.setAttribute('loading','lazy')
    })
    for (const _ of document.querySelectorAll('img[data-src][data-waiting]')) {
        if (isDone) {
            return
        }
        const el: HTMLImageElement = _ as HTMLImageElement
        el.src = el.dataset.src as string
        await waitImgLoaded(el)
    }
}