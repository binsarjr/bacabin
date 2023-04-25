const mirrorImages = [
	'https://mirrorimage-seven.vercel.app'

	// test edge-function
	// 'https://testmirrorimage.vercel.app/'
];

// https://mirrorimage[1-30].vercel.app
for (let i = 1; i <= 30; i++) mirrorImages.push(`https://mirrorimage${i}.vercel.app`);

let index = 0;
export const mirrorImage = () => {
	const mirror = mirrorImages[index];
	if (index === mirrorImages.length - 1) index = 0;
	else index++;
	return mirror;
};

export const refererImage = (url: string, referer: string) => {
	const mirrorLink = new URL(mirrorImage());
	mirrorLink.searchParams.set('cache', encodeURIComponent('public, max-age=3600'));
	mirrorLink.searchParams.set('referer', referer);
	mirrorLink.searchParams.set('url', url);
	return mirrorLink.toString();
};
