import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(), // Ensures TypeScript and Svelte preprocess are both enabled

  kit: {
    adapter: adapter(), // Uses auto adapter
  }
};

export default config;

