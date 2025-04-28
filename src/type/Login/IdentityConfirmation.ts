import { z } from 'zod'

export const identityConfirmationSchema = z.object({
  Account: z.string(),
  lineCode: z.string(),
  boothNo: z.string().min(1, '櫃號不能為空'),
  orderType: z.string().min(1, '請選擇一個選項'),
  confirmOrder: z.boolean(),
  checkOrder: z.boolean(),
  autoNum: z.boolean(),
})

export type IdentityConfirmationFormData = z.infer<typeof identityConfirmationSchema>

export const identityConfirmationDefaultValues: IdentityConfirmationFormData = {
  Account: 'FFFFF',
  lineCode: 'F999000',
  boothNo: '',
  orderType: 'F999000',
  confirmOrder: true,
  checkOrder: true,
  autoNum: true,
}
