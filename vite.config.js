import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        breeds: resolve(__dirname, "src/breed-listing/index.html"),
        breed_detail: resolve(__dirname, "src/breed_detail/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
        join: resolve(__dirname, "src/join/index.html"),
      },
    },
  },
});
