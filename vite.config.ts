import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import circleDependency from "vite-plugin-circular-dependency";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), circleDependency()],
});
