import { defineConfig } from "vite";
import Handlebars from "handlebars";
import fs from "fs";

const jsHandlebars = (userOptions = {}) => {
  return {
    name: "vite-js-handlebars",
    transform(code, id) {
      if (/\.(hbs)$/.test(id)) {
        const buf = fs.readFileSync(id).toString(); //read contents of .hbs file
        const templateFunction = Handlebars.precompile(buf); //precompile the template reduces runtime overhead
        let compiled = ""; //create a string to hold the compiled template
        compiled += "import HandlebarsCompiler from 'handlebars/runtime';\n";
        compiled +=
          "export default HandlebarsCompiler['default'].template(" +
          templateFunction.toString() +
          ");\n";

        return {
          code: compiled,
          map: { mappings: "" },
        };
      }
    },
  };
};

export default defineConfig({
  root: "src",
  assetsInclude: ["**/*.hbs"],
  plugins: [jsHandlebars()],
});
