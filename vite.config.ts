import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import eslint from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/wsd-movie-clone/',
  build: {
    outDir: './dist',
  },
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    eslint(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: '404.html', // 프로젝트 루트에 위치한 404.html
          dest: '.', // 빌드 디렉토리로 복사
        },
      ],
    }),
  ],
})
