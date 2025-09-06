import { defineConfig } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      external: ['echarts'],
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    include: ['echarts'],
    exclude: ['zrender']
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@components': resolve(__dirname, 'src/components')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
