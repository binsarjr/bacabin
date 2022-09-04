import Cheerio from 'cheerio';
import got from 'got/dist/source';
import type { IBaseKomik } from './interfaces';
import type { Chapter, Komik, KomikDetail } from './types';


export * from './types';

export default class BaseKomik implements IBaseKomik {
  name: string;
  website = "(unkown)";
  logo = "(unkown)";
  constructor() {
    this.name = this.constructor.name
  }

  static instance: IBaseKomik
  static getInstance() {
    if (this.instance) return this.instance
    this.instance = new this()
    return this.instance
  }

  protected readonly request = got.extend({
    timeout: {
      request: 60_000,
    },
  });
  protected readonly requestCheerio = async (link: string) => {
    const text = await this.request.get(new URL(link).toString()).text();
    return Cheerio.load(text);
  };
  async list(keyword: string): Promise<Komik[]> {
    return [];
  }
  async show(link: string): Promise<KomikDetail | null> {
    return null;
  }

  async chapters(link: string): Promise<Chapter[]> {
    return [];
  }
  async chaptersImages(link: string): Promise<string[]> {
    return [];
  }

  toObject() {
    return {
      name: this.constructor.name,
      website: this.website,
      logo: this.logo
    }
  }
}
