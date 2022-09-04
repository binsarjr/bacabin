import type { Chapter, Komik, KomikDetail } from './types';

export interface IBaseKomik {
  list(keyword?: string): Promise<Komik[]>;
  show(link: string): Promise<KomikDetail | null>;
  chapters(link: string): Promise<Chapter[]>;
  chaptersImages(link: string): Promise<string[]>;
}
