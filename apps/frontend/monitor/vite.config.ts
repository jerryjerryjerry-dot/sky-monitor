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
            // API 代理到 Monitor Server（前端管理界面调用）
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            },
            // 注意：DSN Server 是给外部 SDK 直接访问的，前端管理界面不需要调用
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
