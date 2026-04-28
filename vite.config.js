import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import scrollbar from 'tailwind-scrollbar'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), scrollbar],
});
