import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Change this if necessary
    proxy: {  // Proxy for the backend
      "/api": "https://encryptobox-backend-production.up.railway.app/",    // Change this if necessary
    },
  },
});
