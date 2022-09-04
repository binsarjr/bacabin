<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>
<div class="w-full md:w-1/2 mx-auto text-center">
    <h1>BacaBin</h1>
    <h5>@author: Binsar Dwi Jasuma</h5>
</div>

{#each data.servers as server}
    {server.title}
{/each}