<script lang="ts">
import type { PageData } from "./$types";


	export let data: PageData;
</script>

{#each data.lists as list}
{list.title}
{/each}
