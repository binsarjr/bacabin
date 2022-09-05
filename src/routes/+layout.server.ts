import type { Load } from '@sveltejs/kit';

export interface BreadcrumbMenu {
	text: string;
	link: string;
}

export const load: Load = ({ url, params }) => {
	const breadcrumbs: BreadcrumbMenu[] = [
		{
			link: '/',
			text: 'BACABIN'
		}
	];
	let lastUrl = '/';
	const paramKeys = Object.keys(params);
	if (paramKeys.length) {
		paramKeys.forEach((param) => {
			lastUrl += params[param] + '/';
			breadcrumbs.push({
				link: lastUrl,
				text: (params[param] || param).toString().replace(/\w\S*/g, function (txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				})
			});
		});
	} else {
		for (const pathurl of url.pathname.split('/').filter(Boolean)) {
			lastUrl += pathurl + '/';
			breadcrumbs.push({
				link: lastUrl,
				text: pathurl.toString().replace(/\w\S*/g, function (txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				})
			});
		}
	}

	return {
		breadcrumbs
	};
};
