<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '@brainandbones/skeleton';

	export let data: PageData;
</script>

<div class="mt-10 mb-24 mx-auto">
	<img src={data.server.logo} alt={data.server.name} width="100px" />
	<h5>
		@credit: <a href={data.server.website} class="text-blue-500 hover:text-blue-800"
			>{data.server.website}</a
		>
	</h5>
	<div class="my-10 tracking-wide">
		<p>
			Selamat Datang di server <strong>{data.server.name}</strong>. Silakan menikmati waktumu
		</p>
	</div>
</div>

<div class="py-3">
	<h2 class="mb-2">Baca Komik</h2>
	<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10">
		{#each data.lists as list}
			<div class="cardpost">
				<a href={list.show}>
					<div class="image">
						<img
							src={list.img}
							alt="[img] {list.img}"
							width="100%"
							class="rounded"
						/>
						<div class="text-image">{list.title}</div>
					</div>
					<div>
						<p class="truncate ...">{list.title}</p>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
