<script lang="ts">
	import { POCKETBASE_URL } from '$lib/utils';
	let { data } = $props();
</script>

<svelte:head>
	<title>PhotoCloud</title>
</svelte:head>

<main>
	<div class="card-container mt-10 flex flex-wrap justify-center gap-4">
		{#if data.images}
			{#each data.images as image}
				<a
					class="card w-80 bg-base-300 p-4 shadow-xl"
					id={`${image.id}`}
					href={`/?imageTitle=${image.Title}`}
					data-sveltekit-preload-data
				>
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
				</a>
			{/each}
		{:else}
			<h1 class="text-center text-2xl">No images found!</h1>
		{/if}
	</div>
</main>
