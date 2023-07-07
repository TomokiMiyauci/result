import { BuildOptions } from "https://deno.land/x/dnt@0.37.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: "both",
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@miyauci/result",
    version,
    description: "Minimum result type port of Rust",
    keywords: [
      "result",
      "ok",
      "error",
      "success",
      "failure",
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
