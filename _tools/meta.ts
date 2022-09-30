import { BuildOptions } from "https://deno.land/x/dnt@0.30.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@miyauci/result",
    version,
    description: "The standard API for result in JavaScript",
    keywords: [
      "result",
      "ok",
      "error",
      "container",
      "handle",
      "throw",
      "throws",
      "handling",
      "match",
      "unsafe",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/result-js",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/result-js.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/result-js/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
});
