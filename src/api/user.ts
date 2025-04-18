import { apiClient } from "./apiConfig";
import { LoginPayload, LoginResponse,TodoResponse } from '@/type/auth'



export const postUserLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await apiClient.post('/BackRule/UserLogin', payload)
  console.log('登入後台', data)
  return data
}

export const getUserInfo = async (userId: string): Promise<TodoResponse> => {
  const { data } = await apiClient.get(`/todos/${userId}`)
  console.log('取得使用者資訊', data)
  return data
}