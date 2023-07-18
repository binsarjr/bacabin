export function hapusPathTerakhir(url: string) {
	url = url.replace(/\/+$/, '')
	let pathTerakhirIndex = url.lastIndexOf('/')
	if (pathTerakhirIndex !== -1) {
		return url.substring(0, pathTerakhirIndex)
	}
	return url
}

export const snakeCase = (text: string) =>
	text
		.replace(/\W+/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('_')
