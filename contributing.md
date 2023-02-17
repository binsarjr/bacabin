# Contributing On BacaBin

## What I should do before contribute?

BacaBin is a free comic reader sourced from many providers. Any contribution are welcomed, however you should be following existing [Interface Types](https://github.com/binsarjr/bacabin/blob/58638f49d4bce0875cb9c4e22efb9fef3dbc6a32/src/lib/scraper/BaseKomik/interfaces.ts#L17).

You could add new providers, by scraping to the their websites or etc. After that, you should add it on new scraper to recognized at [here](https://github.com/binsarjr/bacabin/blob/58638f49d4bce0875cb9c4e22efb9fef3dbc6a32/src/lib/scraper/index.ts#L7)

## How can I contribute?

### Reporting Bug

You could report any bugs you find and make new issue with reproducible steps.

### Suggestions Enhancments

We open to any new suggestions, please put up on issue and tag it with "feature-request"

### Pull Requests

Make a pull request after you made an improvement on BacaBin, had no idea what to contribute yet? here our plans you could implement:

- Add new providers server / improve any existing providers
- Convert to single page
- Add bookmarks
- Add reading history
- Add auto read (scroll down slowly then automatically load the next page)
