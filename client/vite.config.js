import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
   theme: {
    extend: {},
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
})
