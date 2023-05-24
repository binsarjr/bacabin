import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		item: await router.createCaller(await createContext(event)).show({
			server: event.params.server,
			show: event.params.show
		}),
		server: event.params.server as string,
		show: event.params.show as string
	};
};
