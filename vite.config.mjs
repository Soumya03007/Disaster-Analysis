import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path-browserify";
import { componentTagger } from "lovable-tagger";
// Polyfill __dirname in ESM for CommonJS/ESM compatibility
const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Example alias:
      // '@': path.resolve(__dirname, 'src'),
    },
  },
}));

