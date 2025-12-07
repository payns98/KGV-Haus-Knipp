import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/KGV-Haus-Knipp/',  // Name deines GitHub Repos
})
