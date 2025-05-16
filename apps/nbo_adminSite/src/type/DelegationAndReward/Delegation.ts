import { z } from "zod";

export const delegationSchema = z.object({
  traderAccount: z.string().min(1, { message: "請輸入交易人帳號" }),
  traderType: z.string(),
  delegationNumber: z.string().min(1, { message: "請輸入委託單號" }),
  serialNumber: z.string().min(1, { message: "請輸入流水號" }),
  productType: z.string(),
  productMonth: z.string(),
  productCode: z.string(),
  callQuantity: z.number().min(1).max(100),
  callPrice: z.number().min(1).max(100),
  putPrice: z.number().min(1).max(100),
  putQuantity: z.number().min(1).max(100).optional(),
  rodCondition: z.string(),
  closePosition: z.string(),
});

export type DelegationFormData = z.infer<typeof delegationSchema>;

export const delegationDefaultValues: DelegationFormData = {
  traderAccount: "",
  traderType: "0:本國法人",
  delegationNumber:"",
  serialNumber:"",
  productType: "",
  productMonth: "202504",
  productCode: "202504",
  callQuantity: 1,
  callPrice: 1,
  putPrice: 1,
  putQuantity: 1,
  rodCondition: "ROD當日有效",
  closePosition: "自動",
};

// 選單選項
export const traderTypeOptions = [
  { value: "0:本國法人", label: "本國法人" },
  { value: "1:本國自然人", label: "本國自然人" },
  { value: "2:外國法人", label: "外國法人" },
  { value: "3:外國自然人", label: "外國自然人" },
];

export const productTypeOptions = [
  { value: "期貨指數型商品", label: "期貨指數型商品" },
  { value: "選擇權商品", label: "選擇權商品" },
];
export const productMonthOptions = [
  { value: "202504", label: "202504" },
  { value: "202505", label: "202505" },
];

export const rodConditionOptions = [
  { value: "ROD當日有效", label: "ROD當日有效" },
  { value: "ROD隔日有效", label: "ROD隔日有效" },
];

export const closePositionOptions = [
  { value: "自動", label: "自動" },
  { value: "手動", label: "手動" },
];
