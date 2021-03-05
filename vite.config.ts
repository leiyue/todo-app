import vueJsx from '@vitejs/plugin-vue-jsx'
import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root: string = process.cwd()
  const env = loadEnv(mode, root)
  console.log(env)
  const isProd = mode === 'production'
  const isBuild = command === 'build'
  console.log({ isProd, isBuild })
  const { VITE_API_ENDPOINT, VITE_PROXY_TARGET } = env
  return defineConfig({
    plugins: [
      vueJsx(),
      tsconfigPaths(),
      WindiCSS({
        safelist: 'prose prose-sm m-auto shadow shadow-xl'
      })
    ],
    server: {
      port: 3000,
      proxy: {
        '/dev': {
          target: VITE_PROXY_TARGET
          // changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/dev/, '')
        }
      }
    }
  })
}
