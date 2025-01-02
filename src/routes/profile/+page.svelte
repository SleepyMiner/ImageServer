<script lang="ts">
	import { POCKETBASE_URL } from '$lib/utils';
	import { User } from 'lucide-svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<h1 class="mt-10 text-center text-2xl">Profile</h1>
<div class="mt-10 flex justify-center">
	<div class="avatar items-center gap-6">
		<div class="w-24 rounded-full">
			{#if data.userData?.avatar !== ''}
				<img
					src={`${POCKETBASE_URL}/api/files/${data.userData?.collectionId}/${data.userData?.id}/${data.userData?.avatar}`}
					alt="Profile"
				/>
			{:else}
				<User class="w-24" />
			{/if}
		</div>
		<form action="?/profile" method="POST" class="flex flex-col gap-6">
			<input
				type="file"
				class="file-input file-input-bordered file-input-xs w-full max-w-xs"
				accept=".jpg,.jpeg,.png,.gif"
				name="avatar"
			/>
			<button type="submit" class="btn-base-100 btn btn-xs justify-center">Upload</button>
		</form>
	</div>
</div>

<h1 class="mt-10 text-center text-xl">Personal Details</h1>

<div class="flex flex-col items-center justify-center">
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text text-lg"> Name: </span>
		</div>
		<p class="rounded-full bg-base-200 p-2 text-lg">{data.userData?.name}</p>
	</label>
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text text-lg"> Email: </span>
		</div>
		<p class="rounded-full bg-base-200 p-2 text-lg">{data.userData?.email}</p>
	</label>
</div>
