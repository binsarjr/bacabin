import type { KomikDetail } from '$lib/server/scraper/BaseKomik';
import Bacakomik from '$lib/server/scraper/id/Bacakomik';
import Kiryuu from '$lib/server/scraper/id/Kiryuu';
import KomikIndo from '$lib/server/scraper/id/KomikIndo';
import Komikav from '$lib/server/scraper/id/Komikav';
import Komikcast from '$lib/server/scraper/id/Komikcast';
import Komiku from '$lib/server/scraper/id/Komiku';
import Mangayaro from '$lib/server/scraper/id/Mangayaro';
import Mgkomik from '$lib/server/scraper/id/Mgkomik';
import NgomikNet from '$lib/server/scraper/id/NgomikNet';
import ShinigamiId from '$lib/server/scraper/id/ShinigamiId';
import WestManga from '$lib/server/scraper/id/WestManga';
import { describe, expect, it } from 'vitest';

const packages = [
	Bacakomik,
	Kiryuu,
	Komiku,
	Mangayaro,
	NgomikNet,
	ShinigamiId,
	// bagian yang testingnya tidak selesai semua
	Komikcast,
	KomikIndo,
	Komikav,
	Mgkomik,
	WestManga
];

describe('Komik berbahasa indonesia', () => {
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
