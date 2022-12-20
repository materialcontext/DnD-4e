import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  site:  'http://127.0.0.1:3000/',
  output: "server",
  adapter: node({
    mode: "middleware"
  })
});