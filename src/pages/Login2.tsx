import React, { useState } from 'react'
import { Button, Typography, Paper, Box } from '@mui/material'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import SelectBaseFormHook from '@/components/RHForm/SelectBaseFormHook'
import InputBaseFormHook from '@/components/RHForm/InputBaseFormHook'
import CheckboxBaseFormHook from '@/components/RHForm/checkBoxBaseFormHook'
import CaptchaCanvas from '@/components/CaptchaCanvas'
import ToggleButtonGroup from '@/components/ToggleButtonGroup'
import CustomSnackbar from '@/components/CustomSnackbar'
import InputBase from '@/components/InputBase'

import {
  loginSchema,
  loginDefaultValues,
  LoginFormData,
} from '@/type/Login/loginSchema'
import {
  identityConfirmationSchema,
  IdentityConfirmationFormData,
  identityConfirmationDefaultValues
} from '@/type/Login/IdentityConfirmation'

const Login2: React.FC = () => {
  const [selected, setSelected] = useState<'left' | 'right'>('left')
  const [captchaCode, setCaptchaCode] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [emailCode, setEmailCode] = useState('sd')

  const [snackbarObj, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: '' as 'success' | 'error',
  })

  const lineOptions = [
    { value: 'F999000', label: 'F999000' },
    { value: 'F888000', label: 'F888000' },
  ]

  const methods = useForm<LoginFormData>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    console.log(data)

    if (data.captcha !== captchaCode) {
      setTrigger(prev => prev + 1)
      methods.setValue('captcha', '')
      methods.setError('captcha', {
        type: 'manual',
        message: '驗證碼錯誤',
      })
      return
    }
    setOpenSnackbar({
      open: true,
      message: '請至信箱收取驗證信',
      severity: 'success',
    })
  }

  const connectMethods = useForm<IdentityConfirmationFormData>({
    mode: 'all',
    resolver: zodResolver(identityConfirmationSchema),
    defaultValues: identityConfirmationDefaultValues,
  })

  const handleConnectSubmit = connectMethods.handleSubmit(data => {
    console.log('connectMethods:', data)

    // setOpenSnackbar({
    //   open: true,
    //   message: '連線成功',
    //   severity: 'success',
    // })

    setOpenSnackbar({
      open: true,
      message: '身分錯誤，連線失敗',
      severity: 'error',
    })
  })





  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('輸入的驗證碼是:', emailCode)
    setOpenSnackbar({
      open: true,
      message: '驗證碼錯誤',
      severity: 'error',
    })
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
          marginTop: '50px',
        }}>
        <Paper elevation={3} sx={{ padding: 8 }}>
          <FormProvider {...methods}>
            <form
              className="w-300px mx-auto"
              onSubmit={methods.handleSubmit(onSubmit)}>
              <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                登入
              </Typography>
              <div className="flex flex-col gap-4">
                <ToggleButtonGroup selected={selected} onChange={setSelected} />
                <SelectBaseFormHook
                  showLabel={false}
                  selectName="線路期貨商"
                  selectId="lineBroker"
                  options={lineOptions}
                  labelWidth="100px"
                  selectWidth="300px"
                  labelRow={false}
                />
                <InputBaseFormHook
                  showLabel={false}
                  placeholder="帳號"
                  inputName="帳號"
                  inputId="account"
                  labelWidth="100px"
                  inputWidth="300px"
                  labelRow={false}
                />
                <InputBaseFormHook
                  showLabel={false}
                  placeholder="密碼"
                  inputName="密碼"
                  inputId="password"
                  labelWidth="100px"
                  inputWidth="300px"
                  labelRow={false}
                  type="password"
                />
                <InputBaseFormHook
                  showLabel={false}
                  placeholder="驗證碼"
                  inputName="驗證碼"
                  inputId="captcha"
                  labelWidth="100px"
                  inputWidth="190px"
                  labelRow={false}>
                  <div className="relative inline-flex flex-col ml-[10px]">
                    <CaptchaCanvas
                      refreshTrigger={trigger}
                      onCaptchaCode={code => setCaptchaCode(code)}
                    />
                    <span
                      className="w-[120px] text-[14px] absolute bottom-[-24px] left-[-4px] text-blue cursor-pointer"
                      onClick={() => setTrigger(prev => prev + 1)}>
                      看不清楚 換一張
                    </span>
                  </div>
                </InputBaseFormHook>
                <p>驗證碼：{captchaCode}</p>
              </div>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ width: '300px', mt: 1 }}>
                登入
              </Button>
              <p className="text-red-500 text-center">
                忘記帳號、密碼請洽期交所IT人員
              </p>
            </form>
          </FormProvider>
        </Paper>
      </Box>

      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          margin: 'auto',
          marginTop: '50px',
        }}>
        <Paper elevation={3} sx={{ padding: 6 }}>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            信箱驗證
          </Typography>
          <form onSubmit={handleSubmit2}>
            <div className="flex flex-col items-center">
              <p className="mt-0 mb-4 text-[14px] text-red-500">
                已寄送驗證信至 ***252@gmail.com
              </p>
              <InputBase
                showLabel={false}
                placeholder="請輸入驗證碼"
                inputName="驗證碼"
                inputId="emailCode"
                inputWidth="300px"
                value={emailCode}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setEmailCode(e.target.value)}
                labelRow={false}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  width: '120px',
                  height: '50px',
                  mt: 2,
                  '&.Mui-disabled': {
                    pointerEvents: 'auto',
                    cursor: 'not-allowed',
                    opacity: 0.8,
                  },
                }}>
                送出
              </Button>
              <p className="text-blue-500 text-center mt-6 mb-0 underline cursor-pointer">
                返回登入，重新寄送驗證信
              </p>
            </div>
          </form>
        </Paper>
      </Box>

      <Box
        id="box"
        sx={{
          width: '100%',
          maxWidth: '1200px',
          margin: 'auto',
          marginTop: '50px',
        }}>
        <Paper elevation={3}>
          <div className="bg-[#f5f5f5] h-[40px] text-center text-blue">
            <h4 className="text-[16px] font-bold text-center pt-2">身分確認</h4>
          </div>
          <FormProvider {...connectMethods}>
            <form onSubmit={handleConnectSubmit}>
              <div className="p-4">
                <h5 className="mb-3 text-[16px] font-bold text-blue">
                  連線帳號
                </h5>
                <div className="flex gap-1">
                  <InputBaseFormHook
                    inputName="結算會員"
                    inputId="Account"
                    inputWidth="120px"
                    labelRow={false}
                    disabled
                  />
                  <InputBaseFormHook
                    inputName="線路期貨商"
                    inputId="lineCode"
                    inputWidth="150px"
                    labelRow={false}
                    disabled
                  />
                  <InputBaseFormHook
                    inputName="櫃號"
                    inputId="boothNo"
                    inputWidth="70px"
                    labelRow={false}
                  />
                  <SelectBaseFormHook
                    labelRow={false}
                    selectName="選項"
                    selectId="orderType"
                    options={lineOptions}
                  />
                  <div >
                  <span className="block h-[24px]"></span>
                   <CheckboxBaseFormHook
                    name="autoNum"
                    label="自動編號"
                    />
                    </div>
                </div>
                <h5 className=" mb-0 mt-4 text-[16px] font-bold text-blue">
                  交易提示功能
                </h5>
                <div className="inline-flex flex-col">
                  <CheckboxBaseFormHook
                    name="confirmOrder"
                    label="下單時再次確認委託單"
                  />
                  <CheckboxBaseFormHook
                    name="checkOrder"
                    label="刪單減量-檢查委託單"
                  />
                </div>
              </div>
              <div className="flex justify-center pb-2">
                <Button
                  variant="outlined"
                  sx={{ width: '120px' }}
                  onClick={() => connectMethods.reset()}>
                  取消
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginLeft: '10px', width: '120px' }}>
                  確認
                </Button>
              </div>
            </form>
          </FormProvider>
        </Paper>
      </Box>

      <CustomSnackbar
        open={snackbarObj.open}
        message={snackbarObj.message}
        severity={snackbarObj.severity}
        onClose={() => setOpenSnackbar({ ...snackbarObj, open: false })}
        autoHideDuration={3000}
      />
    </>
  )
}

export default Login2
