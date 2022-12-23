import { resolve } from "path";
import { defineConfig } from "vituum";

const config = {
  ...defineConfig(),
  vituum: {
    ...defineConfig().vituum,
    input: [...defineConfig().vituum.input, "./src/html/**/*.html"],
    middleware: {
      ...defineConfig().vituum.middleware,
      viewsDir: resolve(__dirname, "./src/html"),
    },
  },
};

console.log("CONFIG =========", config);
console.log("PATH =========", resolve(__dirname));

export default config;
