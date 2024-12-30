<script lang="ts">
	import '../app.css';
	export let data;
</script>

<nav class="navbar">
	<a href="/" class="flex-1 text-2xl">PhotoCloud</a>
	<div class="flex-none gap-2">
		<form>
			<input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs" />
		</form>
		{#if !data.user}
			<a href="/register" class="btn btn-primary">Register</a>
			<a href="/login" class="btn btn-secondary">Login</a>
		{:else}
			<p class="text-lg">{data.user.name}</p>
			<a href="/logout" class="btn btn-secondary">Logout</a>
		{/if}
	</div>
</nav>

<slot />
