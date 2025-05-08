import React, { useState } from 'react';
import { Box, Paper, Button, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// 元件引入
import InputBase from '@/components/RHForm/InputBaseFormHook';
import SelectBase from '@/components/RHForm/SelectBaseFormHook';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import RadioButton from '@/components/RadioButton'
import NumberInput from '@/components/RHForm/InputNumberFormHook'
// 型別定義與表單驗證引入
import {
  FuturesOrderFormType,
  futuresOrderSchema,
  futuresOrderDefaultValues,
  traderTypeOptions,
  buySellOptions,
  rodConditionOptions,
  orderTypeOptions,
  closePositionOptions
} from '@/type/DelegationAndReward/FuturesOrder';

const FuturesOrder = () => {

  const [selectedValue, setSelectedValue] = useState('StandardOrder')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }


  // React Hook Form 設定
  const methods = useForm<FuturesOrderFormType>({
    resolver: zodResolver(futuresOrderSchema),
    defaultValues: futuresOrderDefaultValues,
    mode: 'onChange'
  });

  const {
    handleSubmit,
    watch,
    setValue,
  } = methods;

  // 取得買賣別目前值
  const buyOrSellValue = watch('buyOrSell');

  // 表單送出處理
  const onSubmit = (data: FuturesOrderFormType) => {
    console.log('提交期貨下單表單:', data);
    // 這裡可以加入API呼叫或其他提交邏輯
  };



  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3}>
            <div className="flex justify-between items-center bg-blue-100 p-2 h-[48px]">
              <span className="text-blue-500">期貨下單</span>
            </div>
            <div className='p-4 flex  gap-4'>

              <div>
                <h5>交易人身分與委託書號確認</h5>
                <div className='flex gap-4'>                  <InputBase
                  inputName='交易人帳號(7碼)'
                  inputId='traderAccount'
                  placeholder="請輸入交易人帳號(7碼)"
                  labelRow={false}
                  useRHF={true}
                />
                  <SelectBase
                    selectName='身分碼'
                    selectId='traderType'
                    options={traderTypeOptions}
                    labelRow={false}
                    useRHF={true}
                  />
                </div>
              </div>

              <div>
                <h5>下單資訊</h5>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-4'>                    <InputBase
                    inputName='委託書編號'
                    inputId='orderNumber'
                    placeholder="未填寫將自動編號"
                    labelWidth='120px'
                    useRHF={true}
                  />
                    <InputBase
                      inputName='流水號'
                      inputId='serialNumber'
                      placeholder=""
                      labelWidth='50px'
                      inputWidth='70px'
                      type='number'
                      useRHF={true}
                    />

                  </div>

                  <InputBase
                    inputName='商品'
                    inputId='product'
                    placeholder=""
                    labelWidth='120px'
                    inputWidth='300px'
                    useRHF={true}
                  />

                  <InputBase
                    inputName='商品代號'
                    inputId='productCode'
                    placeholder=""
                    labelWidth='120px'
                    inputWidth='300px'
                    useRHF={true}
                  />

                  <div>
                    <span className="inline-block w-[130px]">買賣別</span>
                    <ToggleButtonGroup
                      options={buySellOptions}
                      selected={buyOrSellValue || 'CALL'}
                      onChange={newValue => setValue('buyOrSell', newValue)}
                    />
                  </div>
                  <InputBase
                    inputName='委託價格'
                    inputId='orderPrice'
                    placeholder=""
                    labelWidth='120px'
                    inputWidth='300px'
                    type='number'
                    useRHF={true}
                  />

                  <SelectBase
                    selectName="委託條件"
                    selectId="orderCondition"
                    options={rodConditionOptions}
                    selectWidth="300px"
                    labelWidth="120px"
                    useRHF={true}
                  />
                  <SelectBase
                    selectName="委託種類"
                    selectId="orderType"
                    options={orderTypeOptions}
                    selectWidth="300px"
                    labelWidth="120px"
                    useRHF={true}
                  />
                  <SelectBase
                    selectName="開平倉碼"
                    selectId="positionCode"
                    options={closePositionOptions}
                    selectWidth="300px"
                    labelWidth="120px"
                    useRHF={true}
                  />
                </div>
              </div>

              <div>
                <RadioButton
                  label="一般下單"
                  value="StandardOrder"
                  selectedValue={selectedValue}
                  onChange={handleChange}
                />
                <div className="flex items-center mb-3">
                  <span className="inline-block w-[120px]">委託口數</span>
                  <NumberInput
                    name="StandardOrder"
                    min={1}
                    max={100}
                    inputWidth="180px"
                  />
                </div>

                <RadioButton
                  label="鉅額下單"
                  value="BlockTrade"
                  selectedValue={selectedValue}
                  onChange={handleChange}
                />
                <div className="flex items-center mb-3">
                  <span className="inline-block w-[120px]">委託口數</span>
                  <NumberInput
                    name="BlockTrade"
                    min={1}
                    max={100}
                    inputWidth="180px"
                  />
                </div>
              </div>

            </div>


            <div className="bg-gray-100 h-[60px] flex items-center justify-end pr-4 gap-3">
              <Button
                type="submit"
                variant="outlined"
                color="info"
                sx={{ width: '120px', height: '40px', color: '#000' }}
              >
                送出
              </Button>
            </div>
          </Paper>
        </form>
      </FormProvider>
    </Box>
  );
};



export default FuturesOrder;
