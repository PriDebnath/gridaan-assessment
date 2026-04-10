import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import routerPlugin, { tanstackRouter } from '@tanstack/router-plugin/vite'
 
export default defineConfig(({ mode }) => {
  const isGithub = mode === 'github'

  return {
    // 🔑 BASE URL
    // Android → "./"
    // GitHub Pages → "/repo-name/"
    base: isGithub ? '/gridaan-assessment/' : './',
    plugins: [
      react({
        // babel: {
          // plugins: [['babel-plugin-react-compiler']],
        // },
      }),
      tailwindcss(),
      routerPlugin(),
      // tanstackRouter({
      //   // Configure for test environment
      //   routesDirectory: './src/routes',
      //   generatedRouteTree: './src/routeTree.gen.ts',
      //   // disableLogging: true,
      // }),
    ],
    // envDir: "../",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
