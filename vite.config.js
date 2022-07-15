import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins:
    mode === "development"
      ? [
          react({
            jsxRuntime: "classic",
          }),
        ]
      : [],
}));
