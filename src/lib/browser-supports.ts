export const waitImgLoaded = (image: HTMLImageElement) => new Promise((resolve) => {
    image.onload = event => {
        var isLoaded = image.complete && image.naturalHeight !== 0;
        isLoaded && resolve(isLoaded)
    }
})

export const imgLazyLoading = async () => {
    for (const _ of document.querySelectorAll('img[data-src]')) {

        const el: HTMLImageElement = _ as HTMLImageElement
        console.log(el.dataset.src)
        el.src = el.dataset.src as string
        if (el.dataset.waiting !== undefined) await waitImgLoaded(el)
    }
}