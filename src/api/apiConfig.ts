import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'
import { API_TIMEOUT_TIME } from '@/constants'
import { alertErr } from '@/utils/useSwal'
import { getItem } from '@/utils/storage'

// ✅ 建立 API 實例
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api3`,
  timeout: API_TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  validateStatus: () => true
})

// ✅ Request Interceptor - 自動帶入 Bearer Token
function requestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getItem<string>('token')
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
}

// ✅ Response Status 統一處理
function handleResponseStatus(status: number) {
  switch (status) {
    case 401:
      alertErr({ title: '請重新登入', confirmButtonText: '確認' })
      // useAppStatusStore().logout()
      // router.replace({ name: ROUTE_NAME.LOGIN })
      break

    // case 403:
    //   await Swal.fire({
    //     title: '權限不足',
    //     icon: 'warning',
    //     confirmButtonText: '確認'
    //   })
    //   break

    case 404:
      alertErr({ title: '找不到資源', confirmButtonText: '確認' })
      break

    case 500:
      alertErr({ title: '伺服器錯誤', confirmButtonText: '確認' })
      break

    default:
      break
  }
}

// ✅ Response Interceptor
function responseInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(async (response) => {
    const { status } = response
    handleResponseStatus(status)

    // ⬇️ Token 過期自動續約邏輯（保留）
    // if (status === 401) {
    //   const { isLogin, usermail, usercyph } = useAppStatusStore()
    //   try {
    //     if (!isLogin) throw new Error('not login')
    //     const token = await refreshToken(usermail, usercyph)
    //     useAppStatusStore().setToken(token)
    //     return api.request(response.config)
    //   } catch (error) {
    //     console.log(error)
    //     await Swal.fire({
    //       title: '請重新登入',
    //       icon: 'warning',
    //       confirmButtonText: '確認'
    //     })
    //     useAppStatusStore().logout()
    //     router.replace({ name: ROUTE_NAME.LOGIN })
    //   }
    // }

    return response
  })
}

// ✅ 安裝所有 Interceptor
export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(requestInterceptor)
  responseInterceptor(instance)
}

// 初始化 Interceptors
setupInterceptors(apiClient)
