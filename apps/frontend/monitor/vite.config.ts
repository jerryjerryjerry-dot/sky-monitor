import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // 路径别名配置
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    // 开发服务器配置
    server: {
        host: '0.0.0.0', // 允许外部访问
        port: 5173,
        proxy: {
            // API 代理到 Monitor Server
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            },
            // DSN 代理到 DSN Server（如果前端需要直接调用）
            '/dsn': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },

    // 构建配置
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                            return 'vendor'
                        }
                    }
                },
            },
        },
    },
})
