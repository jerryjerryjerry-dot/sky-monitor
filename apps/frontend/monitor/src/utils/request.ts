/**
 * Sky-Monitor 前端请求封装
 * 基于 Axios 实现，包含请求拦截、响应拦截、错误处理
 */
import axios, { type CreateAxiosDefaults } from 'axios'

const config: CreateAxiosDefaults = {
    baseURL: '/api', // 通过 Vite Proxy 代理到后端
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
}

export const request = axios.create(config)

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 自动从 localStorage 获取 token
        const token = localStorage.getItem('sky_monitor_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 统一返回 data 字段
        return response.data
    },
    error => {
        // 401 未授权 - 跳转登录
        if (error.response?.status === 401) {
            localStorage.removeItem('sky_monitor_token')
            window.location.href = '/login'
            return Promise.reject(new Error('未授权，请重新登录'))
        }

        // 403 禁止访问
        if (error.response?.status === 403) {
            return Promise.reject(new Error('没有权限访问'))
        }

        // 500 服务器错误
        if (error.response?.status === 500) {
            return Promise.reject(new Error('服务器错误'))
        }

        return Promise.reject(error)
    }
)
