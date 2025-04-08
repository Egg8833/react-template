import { apiClient } from "./apiConfig";
import { LoginPayload, LoginResponse } from '@/type/auth' // 假設放 types 資料夾



export const postUserLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await apiClient.post('/BackRule/UserLogin', payload)
  console.log('登入後台', data)
  return data
}