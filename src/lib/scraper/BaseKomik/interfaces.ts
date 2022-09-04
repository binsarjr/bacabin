import type { Chapter, Komik, KomikDetail } from './types';

export interface IBaseKomikProperty {
  name: string
  logo: string
  website: string
}

export interface IBaseKomik extends IBaseKomikProperty {
  list(keyword?: string): Promise<Komik[]>;
  show(link: string): Promise<KomikDetail | null>;
  chapters(link: string): Promise<Chapter[]>;
  chaptersImages(link: string): Promise<string[]>;
  toObject(): IBaseKomikProperty
}
