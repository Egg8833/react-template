import { useMutation } from '@tanstack/react-query'
import { postUserLogin } from '@/api/user'
import { alertSucc, alertErr } from '@/utils/useSwal'
import type { LoginPayload, LoginResponse } from '@/type/auth'

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: postUserLogin,
    onSuccess: (data) => {
      if (data.code === '0000') {
        console.log('api登入成功', data)
        alertSucc({
          title: '登入成功',
          text: '歡迎回來！',
          confirmButtonText: '確定'
        })

        // localStorage.setItem('token', data.loginToken)
      } else {
        alertErr({
          title: '登入失敗',
          text: data.message || '未知錯誤',
          confirmButtonText: '確定'
        })
      }
    },
    // onError: (error) => {
    //   console.error('登入失敗', error)
    //   alertErr({
    //     title: '登入失敗',
    //     text: '請檢查您的帳號和密碼',
    //     confirmButtonText: '確定'
    //   })
    // }
  })
}
