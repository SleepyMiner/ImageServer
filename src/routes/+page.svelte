<script lang="ts">
	export let data;
	import { POCKETBASE_URL } from '$lib/utils';
</script>

<svelte:head>
	<title>PhotoCloud</title>
</svelte:head>

<main>
	<div class="card-container mt-10 flex flex-wrap justify-center gap-4">
		{#each data.images as image}
			<div class="card w-80 bg-base-300 p-4 shadow-xl" id={`${image.id}`}>
				<figure>
					<img
						src={`${POCKETBASE_URL}/api/files/${image.collectionId}/${image.id}/${image.image}`}
						alt={image.Title}
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">{image.Title}</h2>
					<p>{image.Description}</p>
				</div>
			</div>
		{/each}
	</div>
</main>
