// esbuild.config.js
import { build } from "esbuild"
import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths"

build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  outdir: "dist",
  format: "cjs", // CommonJS for uWebSockets.js
  target: ["node22"], // match your Node version
  external: ["uWebSockets.js"], // don’t bundle native addon
  sourcemap: true,
  outExtension: { ".js": ".cjs" },
  plugins: [TsconfigPathsPlugin({ tsconfig: "./tsconfig.build.json" })],
}).catch(() => process.exit(1))
