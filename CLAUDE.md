# CLAUDE.md

This file provides guidance for Claude Code when working with the BacaBin codebase.

## Project Overview

BacaBin is a free, ad-free comic/manga reader web application that aggregates content from multiple provider sources. It supports both Indonesian (id) and English (en) manga providers.

## Tech Stack

- **Framework**: SvelteKit 1.x with Svelte 4
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + Skeleton UI + SASS
- **API**: tRPC with Zod validation
- **Scraping**: Cheerio for HTML parsing
- **Runtime**: Bun (preferred) / Node.js 18
- **Deployment**: Vercel (adapter-vercel)
- **Package Manager**: Bun (bun.lockb)

## Project Structure

```
src/
├── lib/
│   ├── server/scraper/       # Server-side manga scrapers
│   │   ├── BaseKomik/        # Base interfaces and types for scrapers
│   │   ├── id/               # Indonesian provider scrapers
│   │   └── en/               # English provider scrapers
│   ├── trpc/                 # tRPC router, client, context
│   ├── stores/               # Svelte stores (bookmarks, history, read)
│   ├── components/           # Reusable Svelte components
│   └── action/               # Svelte actions
├── routes/                   # SvelteKit routes (file-based routing)
│   ├── [server]/             # Dynamic server routes
│   │   ├── [...show]/        # Comic detail pages
│   │   ├── read/[...chapter] # Chapter reading pages
│   │   └── bookmarks/        # Server-specific bookmarks
│   ├── search/               # Search page
│   └── bookmarks/            # Global bookmarks
└── styles/                   # Global styles
```

## Common Commands

```bash
# Development
bun dev               # Start dev server with Bun
bun run dev           # Alternative

# Build & Preview
bun run build         # Production build
bun run preview       # Preview production build

# Code Quality
bun run lint          # Run Prettier check + ESLint
bun run format        # Format with Prettier
bun run check         # TypeScript/Svelte type checking
bun run check:watch   # Type checking in watch mode

# Testing
bun run test          # Run tests with Vitest
```

## Adding New Manga Providers

1. Create a new scraper file in `src/lib/server/scraper/{lang}/` (e.g., `NewProvider.ts`)
2. Implement the `IBaseKomik` interface from `BaseKomik/interfaces.ts`
3. Required methods:
   - `list(searchParams)`: List/search comics
   - `show(link)`: Get comic details
   - `chapters(link)`: Get chapter list
   - `read(chapter_link)`: Get chapter images
4. Register the scraper in `src/lib/server/scraper/index.ts` in the `servers` object

## Key Interfaces

```typescript
// IBaseKomik - Core scraper interface
interface IBaseKomik {
  name: string;
  logo?: string;
  website: string;
  lang: string;
  list(searchParams: URLSearchParams): Promise<Komik[]>;
  show(link: string): Promise<KomikDetail | null>;
  chapters(link: string): Promise<Chapter[]>;
  read(chapter_link: string): Promise<ReadChapter | null>;
}
```

## Code Style

- **Indentation**: Tabs (not spaces)
- **Quotes**: Single quotes
- **Trailing commas**: None
- **Print width**: 100 characters
- **Non-null assertions**: Allowed (`@typescript-eslint/no-non-null-assertion: off`)

## Path Aliases

- `$lib` → `./src/lib`
- `$lib/*` → `./src/lib/*`

## tRPC Endpoints

The tRPC router (`src/lib/trpc/router.ts`) exposes:
- `servers` - List available server keys
- `serverLanguages` - List available languages
- `quicksearch` - Fast search across multiple servers
- `list` - List comics from a specific server
- `show` - Get comic details
- `read` - Get chapter content for reading

## Important Notes

- Image proxying is handled via the mirror service at `/services/mirror`
- Scrapers use `fetchWithTimeout` for network requests
- Some providers are commented out in `index.ts` due to availability issues
- The app uses Svelte stores for client-side state (bookmarks, history)
