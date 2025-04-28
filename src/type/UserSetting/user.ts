import { z } from "zod";

export const userSettingSchema = z.object({
  marketType: z.string(),
  environment: z.string(),
  sessionId: z.string(),
  settlementMember: z.string(),
  lineFutures: z.string(),
  counterNumber: z.string(),
  entrustFutures: z.string(),
  accountIdentity: z.string(),
  password: z.string().min(8, { message: "密碼至少需要8個字元" }),
  confirmOrder: z.boolean().optional(),  // 下單時再次確認委託單
  enableCustomOrderNumber: z.boolean().optional(),  // 啟用期貨商自訂編號最高位數字
  maxOrderDigits: z.boolean()
});

export type UserSettingFormData = z.infer<typeof userSettingSchema>;

export const userSettingDefaultValues: UserSettingFormData = {
  marketType: "",
  environment: "",
  sessionId: "",
  settlementMember: "",
  lineFutures: "",
  counterNumber: "",
  entrustFutures: "",
  accountIdentity: "",
  password: "",
  confirmOrder: true,  // 預設不需要再次確認
  enableCustomOrderNumber: false,  // 預設不啟用自訂編號
  maxOrderDigits: true,  
};