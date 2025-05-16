import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/api/user'
import { TodoResponse } from '@/type/auth'

export const useUserQuery = (userId: string) => {
  return useQuery<TodoResponse, Error>({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId, // 避免 userId 為空時自動執行
    staleTime: 5 * 60 * 1000, // 5 分鐘內都算 "新鮮" 不會重新撈
  })
}
