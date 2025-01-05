<script lang="ts">
	import '../app.css';
	import { POCKETBASE_URL } from '$lib/utils';

	import { Ellipsis, CircleUserRound, Search } from 'lucide-svelte';
	let { children, data } = $props();
</script>

<nav class="navbar p-4">
	<a href="/" class="flex-1 text-xl lg:text-2xl">PhotoCloud</a>
	<form class="flex-1" action="/" method="GET">
		<input
			type="text"
			placeholder="Search"
			name="imageTitle"
			class="input input-bordered w-full max-w-xs rounded-full"
		/>
		<button type="submit" class="btn btn-ghost rounded-full"><Search /></button>
	</form>
	<div class="flex-none gap-2">
		{#if !data.user}
			<div class="hidden gap-2 lg:flex">
				<a href="/register" class="btn btn-primary">Register</a>
				<a href="/login" class="btn btn-secondary">Login</a>
			</div>
			<div class="dropdown dropdown-end lg:hidden">
				<div tabindex="0" role="button" class="btn btn-ghost">
					<div class="w-6">
						<Ellipsis />
					</div>
				</div>
				<ul
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li>
						<a href="/login" class="justify-between">Login</a>
					</li>
					<li><a href="/register">Register</a></li>
				</ul>
			</div>
		{:else}
			<div class="hidden lg:block">
				<a href="/upload" class="btn btn-info btn-sm">Upload Image</a>
			</div>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
					<div class="w-10">
						<div class="flex justify-center rounded-full">
							{#if data.user?.avatar !== ''}
								<img
									src={`${POCKETBASE_URL}/api/files/${data.user?.collectionId}/${data.user?.id}/${data.user?.avatar}`}
									alt="Profile"
									class="rounded-full"
								/>
							{:else}
								<img
									src={`https://ui-avatars.com/api/?name=${data.user?.name}`}
									alt="Uploading User"
									class="size-8 rounded-full"
								/>
							{/if}
						</div>
					</div>
				</div>
				<ul
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a href="/profile">Profile</a></li>

					<li>
						<form action="/logout" method="post">
							<button type="submit"> Logout </button>
						</form>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</nav>

{@render children?.()}
