import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
const pathSrc: string = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],

      dts: path.resolve(pathSrc, 'components.d.ts')
    }),

    Icons({
      autoInstall: true
    })
  ],
  // 配置项目别名
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    port: 8089,
    host: true,
    // 设置代理
    proxy: {
      '/api': {
        // target: 'http://10.101.20.38:8081/', //你要跨域访问的网址
        target: 'http://121.41.51.145:8077/apis',
        changeOrigin: true, // 允许跨域
        rewrite: (path: string) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
      }
    }
  }
})
