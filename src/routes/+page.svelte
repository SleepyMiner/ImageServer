<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { POCKETBASE_URL } from '$lib/utils';

	let images: any = [];

	async function getImages() {
		const records = await pb.collection('images').getFullList();

		console.log(records);
		return records;
	}

	onMount(async () => {
		images = await getImages();
	});
</script>

<svelte:head>
	<title>PhotoCloud</title>
</svelte:head>

<main>
	<div class=" mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
		{#each images as image}
			<div class="card w-96 shadow-xl" id={`${image.id}`}>
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
