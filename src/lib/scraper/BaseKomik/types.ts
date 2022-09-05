export interface Chapter {
	title: string;
	link: string;
}

export interface Komik {
	title: string;
	img: string;
	show: string;
}

export interface KomikDetail {
	title: string;
	img: string;
	chapters: Chapter[];
}
