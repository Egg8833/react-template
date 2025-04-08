import { useQuery } from '@tanstack/react-query'
import { alertSucc, alertErr } from '@/utils/useSwal'
import { getUserInfo } from '@/api/user'
import { TodoResponse } from '@/type/auth'

export const useUserQuery = (userId: string) => {
  return useQuery<TodoResponse, Error>({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId, // 避免 userId 為空時自動執行
    staleTime: 5 * 60 * 1000, // 5 分鐘內都算 "新鮮" 不會重新撈
    onSuccess: (data: TodoResponse) => {
      console.log('使用者資料取得成功', data)
      alertSucc({
        title: '資料取得成功',
        text: `標題：${data.title}`,
        confirmButtonText: '太棒了'
      })
    },
    onError: (error: Error) => {
      console.error('取得使用者資料失敗', error)
      alertErr({
        title: '取得失敗',
        text: '無法取得使用者資料',
        confirmButtonText: '關閉'
      })
    }
  })
}
