import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ce répertoire est utilisé par défaut, mais vous pouvez le spécifier si nécessaire
  },
  server: {
    open: true, // Ouvre le projet dans le navigateur par défaut
  }
})
