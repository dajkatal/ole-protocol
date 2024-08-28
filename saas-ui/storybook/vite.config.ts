import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /(@saas-ui-pro\/[a-z-/]+)$/,
        replacement: '$1/src',
      },
    ],
  },
})
