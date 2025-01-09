<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { POCKETBASE_URL } from '$lib/utils';

	let { data } = $props();
	let loading = false;

	// Handle delete form submission and invalidate page content
	const handleDelete = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();  // Invalidate and reload the saved items
			}
			loading = false;
		};
	};

	// Handle save form submission (heart icon click)
	const handleSave = async (itemId: string) => {
		loading = true;
		try {
			// Send API request to save/remove the item
			const response = await fetch(`/saved/api/save-item/${itemId}`, { method: 'POST' });
			if (response.ok) {
				// Invalidate page content to refresh the saved items
				await invalidateAll();
			} else {
				console.error('Error saving/removing the item');
			}
		} catch (error) {
			console.error('Error saving/removing the item', error);
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Saved Items</title>
</svelte:head>

<h1 class="mt-10 text-center text-2xl">Saved Items</h1>

{#if data.savedItems?.length > 0}
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
		{#each data.savedItems as item}
			<div class="card shadow-lg p-4">
				<img
					src={`${POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`}
					alt={item.title}
					class="rounded w-full h-48 object-cover"
				/>
				<div class="mt-4">
					<h3 class="text-lg font-semibold">{item.title}</h3>
					<p class="text-sm text-gray-600">{item.description}</p>
				</div>

				<!-- Heart Icon to Save Item -->
				<button 
					on:click={() => handleSave(item.id)} 
					class="text-2xl"
				>
					{#if item.isSaved}
						<i class="fa fa-heart text-red-500"></i> <!-- Filled Heart -->
					{:else}
						<i class="fa fa-heart-o text-gray-500"></i> <!-- Empty Heart -->
					{/if}
				</button>

				<!-- Delete Form -->
				<form
					action="?/delete"
					method="POST"
					class="mt-4"
					use:enhance={handleDelete}
				>
					<input type="hidden" name="id" value={item.id} />
					{#if loading}
						<button class="btn btn-error btn-sm w-full loading" disabled>Loading</button>
					{:else}
						<button type="submit" class="btn btn-error btn-sm w-full">Delete</button>
					{/if}
				</form>
			</div>
		{/each}
	</div>
{:else}
	<p class="text-center text-gray-500">No items saved yet.</p>
{/if}
