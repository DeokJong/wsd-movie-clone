import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import eslint from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/wsd-movie-clone/',
  build: {
    outDir: './dist'
  },
  plugins: [TanStackRouterVite(), viteReact(), eslint(), tsconfigPaths()],
})
