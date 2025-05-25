import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import circleDependency from 'vite-plugin-circular-dependency'

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react(), tsconfigPaths(), circleDependency()],
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.mjs'],
  },
})
