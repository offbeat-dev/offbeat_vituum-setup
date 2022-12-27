import { resolve } from "path";
import { defineConfig } from "vituum";
import handlebars from "@vituum/handlebars";

const vitePluginExample = () => ({
  name: "output-plugin-stats",
  configResolved(config) {
    const plugins = config.plugins.map((plugin) => plugin.name);
    console.log(`Your project has ${plugins.length} Vite plugins.`);
    console.table(plugins);
  },
});

const config = {
  ...defineConfig({
    integrations: [handlebars({})],
  }),
  vituum: {
    ...defineConfig().vituum,
    input: [...defineConfig().vituum.input, "./src/html/**/*.hbs"],
    middleware: {
      ...defineConfig().vituum.middleware,
      viewsDir: resolve(__dirname, "./src/html"),
    },
  },
  plugins: [...defineConfig().plugins, vitePluginExample()],
};

console.log("CONFIG =========", config);
console.log("PATH =========", resolve(__dirname));
console.log(handlebars());

export default config;
