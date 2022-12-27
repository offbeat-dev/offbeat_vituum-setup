import { resolve } from "path";
import handlebars from "@vituum/vite-plugin-handlebars";

const config = {
  plugins: [
    handlebars({
      reload: true,
      root: "src/",
      helpers: {},
      partials: {
        directory: null,
        extname: true,
      },
      data: "*.json",
      globals: {
        template: "src/html/components/test.hbs",
      },
      filetypes: {
        html: /.(json.html|hbs.json.html|hbs.html)$/,
        json: /.(json.hbs.html)$/,
      },
      handlebars: {
        compileOptions: {},
        runtimeOptions: {},
      },
    }),
  ],
};

console.log("CONFIG =========", config);
console.log("PATH =========", resolve(__dirname));
console.log(handlebars());

export default config;
