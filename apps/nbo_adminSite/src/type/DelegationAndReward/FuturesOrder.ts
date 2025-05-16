import * as z from 'zod';



// 表單驗證結構
export const futuresOrderSchema = z.object({
  // 交易人身分與委託書號確認
  traderAccount: z.string().min(1, '請輸入交易人帳號'),
  traderType: z.string().min(1, '請選擇身分碼'),
  
  // 下單資訊
  orderNumber: z.string(),
  serialNumber: z.coerce.number().min(0, '流水號不可為負數'),
  product: z.string().min(1, '請輸入商品'),
  productCode: z.string().min(1, '請輸入商品代號'),
  buyOrSell: z.string().min(1, '請選擇買賣別'),
  orderPrice: z.coerce.number().min(0, '委託價格不可為負數'),

  // 委託相關選項
  orderCondition: z.string().min(1, '請選擇委託條件'),
  orderType: z.string().min(1, '請選擇委託種類'),
  positionCode: z.string().min(1, '請選擇開平倉碼'),

  //委託下單
  StandardOrder: z.number().min(0),
  BlockTrade: z.number().min(0),
});

// 將 zod schema 轉為 React Hook Form 使用的型別
export type FuturesOrderFormType = z.infer<typeof futuresOrderSchema>;

// 表單預設值
export const futuresOrderDefaultValues: FuturesOrderFormType = {
  traderAccount: '',
  traderType: '0:本國法人',
  orderNumber: '',
  serialNumber: 0,
  product: '',
  productCode: '',
  buyOrSell: 'CALL',
  orderPrice: 0,
  orderCondition: 'ROD',
  orderType: 'limit',
  positionCode: 'open',
  StandardOrder: 0,
  BlockTrade: 0,
};

// 身分碼選項
export const traderTypeOptions = [
  { value: "0:本國法人", label: "本國法人" },
  { value: "1:本國自然人", label: "本國自然人" },
  { value: "2:外國法人", label: "外國法人" },
  { value: "3:外國自然人", label: "外國自然人" },
];

// 買賣別選項
export const buySellOptions = [
  { label: '買進', value: 'CALL' },
  { label: '賣出', value: 'PUT' },
];

// 委託條件選項
export const rodConditionOptions = [
  { value: 'ROD', label: 'ROD當日有效' },
  { value: 'IOC', label: 'IOC立即成交否則取消' },
  { value: 'FOK', label: 'FOK全部成交否則取消' },
];
// 委託種類選項
export const orderTypeOptions = [
  { value: 'limit', label: '限價單 (Limit Order)' },
  { value: 'market', label: '市價單 (Market Order)' },
  { value: 'stop', label: '停損單 (Stop Loss Order)' },
  { value: 'stop_limit', label: '停損限價單 (Stop Limit Order)' },
  { value: 'trigger', label: '觸發單 (Trigger Order)' },
];

// 開平倉碼選項
export const closePositionOptions = [
  { value: 'open', label: '開倉' },
  { value: 'close', label: '平倉' },
  { value: 'auto', label: '自動' },
];