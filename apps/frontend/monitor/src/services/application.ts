/**
 * 应用管理相关 API
 */
import type { ApplicationListRes, CreateApplicationPayload } from '@/types/api'
import { request } from '@/utils/request'

/**
 * 获取应用列表
 */
export const fetchApplicationList = async (): Promise<ApplicationListRes> => {
    return await request.get('/application')
}

/**
 * 创建应用
 */
export const createApplication = async (data: CreateApplicationPayload) => {
    return await request.post('/application', data)
}

/**
 * 删除应用
 */
export const removeApplication = async (appId: string) => {
    return await request.delete('/application', { data: { appId } })
}

/**
 * 更新应用
 */
export const updateApplication = async (data: Partial<CreateApplicationPayload> & { appId: string }) => {
    return await request.put('/application', data)
}
