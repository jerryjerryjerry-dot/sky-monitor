/**
 * Sky-Monitor API 类型定义
 */

// 通用响应类型
export interface ApiResponse<T = unknown> {
    data: T
    success: boolean
    message?: string
}

// 用户相关
export interface LoginPayload {
    username: string
    password: string
}

export interface LoginRes {
    token: string
    user: UserInfo
}

export interface UserInfo {
    id: number
    username: string
    email?: string
    createdAt?: string
}

export interface CurrentUserRes {
    id: number
    username: string
    email?: string
}

// 应用管理相关
export interface Application {
    id: number
    appId: string
    name: string
    type: 'vanilla' | 'react' | 'vue'
    description?: string
    createdAt: string
    updatedAt?: string
}

export interface ApplicationListRes {
    data: Application[]
    success: boolean
}

export interface CreateApplicationPayload {
    name: string
    type: 'vanilla' | 'react' | 'vue'
    description?: string
}

export interface DeleteApplicationPayload {
    appId: string
}
