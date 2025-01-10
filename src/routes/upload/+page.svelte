<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let loading: boolean = $state(false);

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('image-preview');
			preview.src = src;
		}
	};

	const handleSubmit = () => {
		loading = true;
		setTimeout(() => {
			loading = false;
			invalidateAll();
		}, 2000);
	};
</script>

<svelte:head>
	<title>Upload Images</title>
</svelte:head>

<form action="?/upload" method="post" enctype="multipart/form-data" use:enhance={handleSubmit}>
	<h1 class="mt-10 text-center text-2xl">Upload the image</h1>

	<div class="mt-10 flex flex-col items-center justify-center gap-6">
		<div class=" w-32 rounded-full">
			<img
				src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
				alt="Upload"
				id="image-preview"
			/>
		</div>

		<input
			type="file"
			class="file-input file-input-bordered file-input-xs w-full max-w-xs"
			accept=".jpg,.jpeg,.png,.gif"
			name="image"
			disabled={loading}
			onchange={showPreview}
			required
		/>

		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Image Title</span>
			</div>
			<input
				type="text"
				placeholder="Type here"
				name="Title"
				class="input input-bordered w-full max-w-xs"
				required
			/>
		</label>

		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Image Description</span>
			</div>
			<input
				type="text"
				placeholder="Type here"
				name="Description"
				class="input input-bordered w-full max-w-xs"
				required
			/>
		</label>

		{#if loading}
			<div class="flex items-center justify-center">
				<span class="loading loading-spinner loading-xs"></span>
			</div>
		{:else}
			<button type="submit" class="btn-base-100 btn btn-md justify-center" disabled={loading}
				>Upload</button
			>
		{/if}
	</div>
</form>
