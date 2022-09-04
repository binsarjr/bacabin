<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="md:w-[80%] mt-10 mb-24 mx-auto text-center">
	<h1>BacaBin</h1>
	<h5>@author: Binsar Dwi Jasuma</h5>
	<div class="my-10 tracking-wide">
		<h5>*Pesan Langsung Dari Developer. Silakan Disimak!!</h5>
		<p>
			Website ini merupakan website baca komik <strong class="uppercase">ilegal</strong> yang mengambil
			konten dari website lain baik legal maupun ilegal dan digunakan hanya untuk diri saya sendiri.
			Silakan berdonasi atau dukungan apapun untuk situs aslinya apabila Anda ingin membacanya di sini, bebas iklan
		</p>
	</div>
</div>

<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
    {#each data.servers as server}
        <div class="">
            <a href="/{server.server}">
                {#if server.img}
                <img src="{server.img}" width="100%" alt="">
                {:else}
                <h2>{server.title}</h2>
                {/if}
            </a>
        </div>
    {/each}
</div>

<footer class="mt-20">
    <h2>Let's Connected</h2>
    <table class="text-left mt-3">
        {#each data.connection as connection}
        <tr>
            <th>{connection.platform}</th>
            <td class="pr-5">:</td>
            <td><a href="{connection.link}" class="hover:text-blue-500 active:text-blue-800" target="_blank">{connection.text}</a></td>
        </tr>
        {/each}
    </table>
</footer>