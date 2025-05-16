import React, {useState} from 'react'
import {Button, Paper, Box} from '@mui/material'
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import InputBaseFormHook from '@/components/RHForm/InputBaseFormHook'
import SelectBaseFormHook from '@/components/RHForm/SelectBaseFormHook'
import NumberInput from '@/components/RHForm/InputNumberFormHook'
import ToggleButtonGroup from '@/components/ToggleButtonGroup'
import RadioButton from '@/components/RadioButton'
import {
  delegationSchema,
  delegationDefaultValues,
  DelegationFormData,
  traderTypeOptions,
  productTypeOptions,
  rodConditionOptions,
  closePositionOptions,
  productMonthOptions,
} from '@/type/DelegationAndReward/Delegation'

const Delegation = () => {
  const [traderType, setTraderType] = useState('')
  const [selectBuyAndSell, setBuyAndSell] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedValue2, setSelectedValue2] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }
   const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue2(event.target.value)
  }

  const methods = useForm<DelegationFormData>({
    mode: 'all',
    resolver: zodResolver(delegationSchema),
    defaultValues: delegationDefaultValues,
  })

  const {handleSubmit, reset} = methods

  const onSubmit: SubmitHandler<DelegationFormData> = data => {
    console.log('表單資料:', data)
  }

  return (
    <Box sx={{width: '100%'}}>
      <Paper elevation={3}>
        <div className="flex justify-between items-center bg-blue-100  p-2 h-[48px]">
          <span className=" text-blue-500">造勢者委託 </span>
          <Button
            onClick={() => {
              reset() // 重置表單
              setTraderType('') // 清空期選別
              setBuyAndSell('') // 清空買賣權
            }}
            type="button"
            variant="contained"
            color="error"
            sx={{width: '140px', height: '32px'}}>
            清除所有內容
          </Button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4 px-3 flex gap-10 flex-wrap">
              {/* 交易人資訊 */}
              <div className="flex flex-col gap-4">
                <h5 className="mb-2">交易人身分與委託書號確認</h5>
                <div className="flex gap-2">
                  <InputBaseFormHook
                    inputName="交易人帳號(7碼)"
                    inputId="traderAccount"
                    labelRow={false}
                    inputWidth="160px"
                  />
                  <SelectBaseFormHook
                    selectName="身分碼"
                    selectId="traderType"
                    options={traderTypeOptions}
                    selectWidth="160px"
                    labelRow={false}
                  />
                </div>
              </div>

              {/* 造市資訊 */}
              <div className="flex flex-col gap-4">
                <h5 className="mb-2">造市資訊</h5>
                <div className="flex gap-4 flex-col flex-wrap">
                  <div className="flex gap-3">
                    <InputBaseFormHook
                      inputName="委託書編號"
                      inputId="delegationNumber"
                      labelWidth="140px"
                      inputWidth="160px"
                    />
                    <InputBaseFormHook
                      inputName="流水號"
                      inputId="serialNumber"
                      inputWidth="50px"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="inline-block w-[140px]">期選別</span>
                    <ToggleButtonGroup
                      options={[
                        {label: '期貨', value: 'future'},
                        {label: '選擇權', value: 'option'},
                      ]}
                      selected={traderType}
                      onChange={newValue => setTraderType(newValue)}
                    />
                  </div>

                  <SelectBaseFormHook
                    labelWidth="140px"
                    selectName="類別"
                    selectId="productType"
                    options={productTypeOptions}
                    selectWidth="300px"
                  />
                  <SelectBaseFormHook
                    labelWidth="140px"
                    selectName="商品月份"
                    selectId="productMonth"
                    options={productMonthOptions}
                    selectWidth="300px"
                  />
                  <InputBaseFormHook
                    inputName="商品代號"
                    inputId="productCode"
                    labelWidth="140px"
                    inputWidth="300px"
                  />
                  <div className="flex gap-2 items-center">
                    <span className="inline-block w-[140px]">買賣權</span>
                    <ToggleButtonGroup
                      options={[
                        {label: 'Call', value: 'CALL'},
                        {label: 'Put', value: 'PUT'},
                      ]}
                      selected={selectBuyAndSell}
                      onChange={newValue => setBuyAndSell(newValue)}
                    />
                  </div>

                  <SelectBaseFormHook
                    selectName="委託條件"
                    selectId="rodCondition"
                    options={rodConditionOptions}
                    labelWidth="140px"
                    selectWidth="300px"
                  />
                  <SelectBaseFormHook
                    selectName="開平倉碼"
                    selectId="closePosition"
                    options={closePositionOptions}
                    labelWidth="140px"
                    selectWidth="300px"
                  />
                </div>
              </div>

              {/* 買入賣出數量 */}
              <div className="flex flex-col gap-4">
                <div className="pt-12 flex gap-4 flex-col">
                  {/* 買進 */}
                  <div className="mb-4">
                    <h3 className="pb-2">買進</h3>
                    <div className="flex items-center mb-3">
                      <span className="inline-block w-[120px]">價格</span>
                      <NumberInput
                        name="callPrice"
                        min={1}
                        max={100}
                        inputWidth="180px"
                      />
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="inline-block w-[120px]">口數</span>
                      <NumberInput
                        name="callQuantity"
                        min={1}
                        max={100}
                        inputWidth="180px"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-[120px]">改價功能</span>
                       <RadioButton
                        label="選項M"
                        value="M"
                        selectedValue={selectedValue2}
                        onChange={handleChange2}
                      />
                      <RadioButton
                        label="選項m"
                        value="m"
                        selectedValue={selectedValue2}
                        onChange={handleChange2}
                      />
                    </div>
                  </div>
                  {/* 賣出 */}
                  <div>
                    <h3 className="pb-2">賣出</h3>
                    <div className="flex items-center mb-3">
                      <span className="inline-block w-[120px]">價格</span>
                      <NumberInput
                        name="putPrice"
                        min={1}
                        max={100}
                        inputWidth="180px"
                      />
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="inline-block w-[120px]">口數</span>
                      <NumberInput
                        name="putQuantity"
                        min={1}
                        max={100}
                        inputWidth="180px"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-[120px]">改價功能</span>
                      <RadioButton
                        label="選項A"
                        value="a"
                        selectedValue={selectedValue}
                        onChange={handleChange}
                      />
                      <RadioButton
                        label="選項B"
                        value="b"
                        selectedValue={selectedValue}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{width: '120px', height: '40px'}}>
                      漲跌停查詢
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{width: '120px', height: '40px', marginLeft: '10px'}}>
                      價格區間 -{' '}
                    </Button>
                    <p className="text-red-500 mt-3 text-[14px]">
                      如果委託單為報價單，使用IOC/FOK表示一定期間後系統自動刪除
                    </p>
                  </div>
                </div>
              </div>

              {/* 按鈕 */}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{width: '120px', height: '40px'}}>
                  送出委託
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
        <div className="bg-gray-100 h-[60px] flex items-center justify-end pr-4 gap-3">
          <Button
            type="submit"
            variant="outlined"
            color="info"
            sx={{width: '120px', height: '40px', color: '#000'}}>
            送出
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="info"
            sx={{width: '120px', height: '40px', color: '#000'}}>
            取消
          </Button>
        </div>
      </Paper>
    </Box>
  )
}

export default Delegation
