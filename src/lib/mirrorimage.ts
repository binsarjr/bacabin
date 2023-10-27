// const mirrorImages = [
// 	'https://mirrorimage-seven.vercel.app'

// 	// test edge-function
// 	// 'https://testmirrorimage.vercel.app/'
// ];

// // https://mirrorimage[1-30].vercel.app
// for (let i = 1; i <= 30; i++) mirrorImages.push(`https://mirrorimage${i}.vercel.app`);

// let index = 0;
// export const mirrorImage = () => {
// 	const mirror = mirrorImages[index];
// 	if (index === mirrorImages.length - 1) index = 0;
// 	else index++;
// 	return mirror;
// };

export const refererImage = ({ url, referer, base64: isBase64 = false }: { url: string, referer: string, base64?: boolean }) => {
	const searchParams = new URLSearchParams();
	searchParams.set('referer', isBase64 ? Buffer.from(referer, 'utf8').toString('base64') : referer);
	searchParams.set('url', isBase64 ? Buffer.from(url, 'utf8').toString('base64') : url);
	if (isBase64) searchParams.set('base64', '')
	return `/services/mirror?` + searchParams.toString();
};
