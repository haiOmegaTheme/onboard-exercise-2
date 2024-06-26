import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envFull = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react()],
    server: {
      open: true,
      cors: true,
      port: +envFull.VITE_PORT || 3000,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  };
});
