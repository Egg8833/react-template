import { z } from "zod";

export const login2Schema = z.object({
  lineBroker: z.string().min(1, { message: "線路期貨商為必填項目" }),
  brokerCode: z.string().min(1, { message: "期貨商代號為必填項目" }),
  account: z.string().min(1, { message: "登入帳號為必填項目" }),
  password: z
    .string()
    .min(6, { message: "密碼至少需要 6 個字元" })
    .max(20, { message: "密碼不能超過 20 個字元" }),
  captcha: z.string().min(4, { message: "驗證碼為必填項目" }),
});

export type Login2FormData = z.infer<typeof login2Schema>;

export const login2DefaultValues: Login2FormData = {
  lineBroker: "F999000",
  brokerCode: "F999000",
  account: "",
  password: "",
  captcha: "",
};
