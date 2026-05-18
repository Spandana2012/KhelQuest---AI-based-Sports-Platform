
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'] // add other dependencies if needed
  },
  build: {
    rollupOptions: {
      input: '/index.html', // ensure this matches your entry file
    },
  },
})
