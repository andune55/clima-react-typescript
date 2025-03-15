import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "https://andune55.github.io/clima-react-typescript/",
  plugins: [react()],
})
