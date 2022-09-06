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
    for (const _ of document.querySelectorAll('img[data-src]')) {
        if (isDone) {
            return
        }
        const el: HTMLImageElement = _ as HTMLImageElement
        el.src = el.dataset.src as string
        if (el.dataset.waiting !== undefined) await waitImgLoaded(el)
    }
}