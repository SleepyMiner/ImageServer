<script lang="ts">
	import '../app.css';

	import { Ellipsis, CircleUserRound, LogOut, Search } from 'lucide-svelte';
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
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
					<div class="w-10">
						<div class="flex justify-center">
							<CircleUserRound size={30} />
						</div>
					</div>
				</div>
				<ul
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><p>{data.user.name}</p></li>
					<li><a href="/profile">Profile</a></li>
					<li>
						<form action="/logout" method="post">
							<button type="submit" class="flex items-center justify-center gap-2"
								><LogOut />
								Logout
							</button>
						</form>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</nav>

{@render children?.()}
