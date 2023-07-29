import type { KomikDetail } from '$lib/server/scraper/BaseKomik';
import Asura from '$lib/server/scraper/en/Asura';
import Manganato from '$lib/server/scraper/en/Manganato';
import Mangareader from '$lib/server/scraper/en/Mangareader';
import Mangastic from '$lib/server/scraper/en/Mangastic';
import { describe, expect, it } from 'vitest';

const packages = [Asura, Manganato, Mangareader, Mangastic];

describe('Komik berbahasa inggris', () => {
	packages.map((komikCLass) => {
		describe(komikCLass.name, async () => {
			const searchParams = new URLSearchParams();

			const list = await komikCLass.list(searchParams);
			let komik: KomikDetail | null = null;

			it('list', () => {
				expect(list.length).greaterThanOrEqual(1);
			});

			it('search', async () => {
				searchParams.set('q', 'a');
				expect((await komikCLass.list(searchParams)).length).greaterThanOrEqual(1);
			});
			it('show', async () => {
				const item = list.shift();
				expect(item).toBeTruthy();
				komik = await komikCLass.show(item?.show || '');
				expect(komik).toBeTruthy();
				expect(komik?.chapters.length).greaterThanOrEqual(1);
			});

			it('read chapter', async () => {
				const chapter = komik?.chapters.shift();
				expect(chapter).toBeTruthy();
				const read = await komikCLass.read(komik?.chapters.shift()?.link || '');
				expect(read).toBeTruthy();

				const resp = await fetch(chapter?.link || '');
				expect(resp.status).toBe(200);
			});
		});
	});
});
