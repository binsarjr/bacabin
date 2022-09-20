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
    const imgSelectors = 'img[data-waiting-src]'
    document.querySelectorAll(imgSelectors).forEach((_) => {
        const el = _ as HTMLImageElement
        if (!el.src) el.src = '/loading.gif'
        // Read More: https://web.dev/browser-level-image-lazy-loading/
        el.setAttribute('loading', 'lazy')
    })

    // Save concurrency progres
    let futures = []
    const totalImages = document.querySelectorAll(imgSelectors).length
    // totalImage * 2%
    const percentOfTotalImageNeeded = Math.floor(totalImages * 5 / 100)
    const conccurrency = percentOfTotalImageNeeded > 0 ? percentOfTotalImageNeeded : 5;

    for (const _ of document.querySelectorAll(imgSelectors)) {
        if (isDone) {
            return
        }
        const el: HTMLImageElement = _ as HTMLImageElement
        el.src = el.dataset.waitingSrc as string
        if (futures.length < conccurrency) futures.push(waitImgLoaded(el))
        else {
            await Promise.all(futures)
            futures = []
        }
    }
    if (futures.length) await Promise.all(futures)
}