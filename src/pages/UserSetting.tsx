import React, { useState } from 'react'
import { Button, Typography, Paper, Box } from '@mui/material'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputBaseFormHook from '@/components/RHForm/InputBaseFormHook'
import CheckboxBaseFormHook from '@/components/RHForm/checkBoxBaseFormHook'
import NumberInput from '@/components/NumberInput'
import NumberInputExample from '@/pages/NumberInputExample'
import {
  userSettingSchema,
  userSettingDefaultValues,
  UserSettingFormData,
} from '@/type/UserSetting/user.ts'

const UserSetting = () => {
  const methods = useForm<UserSettingFormData>({
    mode: 'all',
    resolver: zodResolver(userSettingSchema),
    defaultValues: userSettingDefaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<UserSettingFormData> = (data) => {
    console.log(data)
  }


  const [quantity, setQuantity] = useState(1);





  return (
    <>
      <Box sx={{ width: '100%' }}>

        <Paper elevation={3} >
          <h4 className='bg-blue-100 h-[40px] p-2 text-blue-500'>使用者設定</h4>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='py-4 px-3 flex gap-10 flex-wrap'>
                <div>
                  <h5 className="mb-4">環境資訊</h5>
                  <div className='flex gap-2'>
                    <InputBaseFormHook
                      inputName="盤別"
                      inputId="marketType"
                      labelRow={false}
                      inputWidth="160px"
                    />
                    <InputBaseFormHook
                      inputName="環境"
                      inputId="environment"
                      labelRow={false}
                      inputWidth="160px"
                    />
                    <InputBaseFormHook
                      inputName="Session ID"
                      inputId="sessionId"
                      labelRow={false}
                      inputWidth="160px"
                    />
                  </div>
                  <h5 className="my-4">環境資訊</h5>
                  <div className='flex gap-2 flex-wrap'>
                    <InputBaseFormHook
                      inputName="結算會員"
                      inputId="settlementMember"
                      labelRow={false}
                      inputWidth="160px"
                    />
                    <InputBaseFormHook
                      inputName="線路期貨商"
                      inputId="lineFutures"
                      labelRow={false}
                      inputWidth="160px"
                    />
                    <InputBaseFormHook
                      inputName="櫃號"
                      inputId="counterNumber"
                      labelRow={false}
                      inputWidth="160px"
                    />
                    <InputBaseFormHook
                      inputName="委託期貨商"
                      inputId="entrustFutures"
                      labelRow={false}
                      inputWidth="160px"
                    />
                  </div>
                  <div className='flex flex-col gap-2 mt-2'>
                    <InputBaseFormHook
                      inputName="帳號身分"
                      inputId="accountIdentity"
                      labelRow={false}
                      inputWidth="160px"
                    />

                    <div>

                      <InputBaseFormHook
                        inputName="密碼"
                        inputId="password"
                        labelRow={false}
                        inputWidth="160px"
                        type="password"
                      >
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          sx={{ width: '120px', marginLeft: '10px', marginTop: '2px' }}
                        >
                          修改密碼
                        </Button>
                      </InputBaseFormHook>
                      <p className='text-[14px] text-red-500 mt-1 '>密碼將於2025-06-25 到期</p>
                    </div>


                  </div>
                </div>
                <div >
                  <h5 className="mb-2">環境資訊</h5>
                  <div className='flex flex-col'>
                    <CheckboxBaseFormHook
                      name="confirmOrder"
                      label="下單時再次確認委託單"
                    />
                    <CheckboxBaseFormHook
                      name="enableCustomOrderNumber"
                      label="刪單減量-檢查委託單"
                    />
                  </div>
                  <h5 className="mb-2">鉅額交易功能</h5>
                  <div className='flex gap-2'>
                    <CheckboxBaseFormHook
                      name="maxOrderDigits"
                      label="啟用期貨商自訂編號最高位數字"
                    />
                    <NumberInput
                      value={quantity}
                      onChange={setQuantity}
                      min={0}
                      max={100}
                      inputWidth='80px'
                      
                    />
                  </div>
                </div>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: '120px' }}
                  >
                  修改密碼
                </Button> */}
              </div>


            </form>
          </FormProvider>
          <div className='bg-gray-100 h-[40px]'></div>
        </Paper>
      </Box>
    </>
  )
}

export default UserSetting
