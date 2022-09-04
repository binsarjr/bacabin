import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    const servers = [{ title: 'komikindo', label: 'https://i2.wp.com/i2.wp.com/kentut.xyz/uploads/2020/12/komikindo.png?w=140?w=140', url: 'https://komikindo.id/' }];
    return {
        servers
    }
}