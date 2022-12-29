import { resolve } from "path";
import { defineConfig } from "vituum";
import handlebars from "@vituum/handlebars";

const hotUpdateReport = () => ({
  name: "hot-update-report",
  handleHotUpdate({ file, timestamp, modules }) {
    console.log(`${timestamp}: ${modules.length} module(s) updated`);
  },
});

const requestAnalytics = () => ({
  name: "request-analytics",
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        console.log(`${req.method.toUpperCase()} ${req.url}`);
        next();
      });
    };
  },
});

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
  plugins: [
    ...defineConfig().plugins,
    vitePluginExample(),
    requestAnalytics(),
    hotUpdateReport(),
  ],
};

console.log("CONFIG =========", config);
console.log("PATH =========", resolve(__dirname));
console.log(handlebars());

export default config;
