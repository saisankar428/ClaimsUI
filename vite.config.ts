import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // eslint-disable-next-line no-undef
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
