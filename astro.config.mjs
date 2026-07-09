import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cboom.up.railway.app",
  base: "/",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});