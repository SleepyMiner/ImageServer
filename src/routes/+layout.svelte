<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="navbar">
	<a href="/" class="flex-1 text-2xl">PhotoCloud</a>
	<div class="flex-none gap-2">
		<form>
			<input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs" />
		</form>
		<a href="/register" class="btn btn-primary">Register</a>
		<a href="/login" class="btn btn-secondary">Login</a>
	</div>
</nav>
{@render children()}
