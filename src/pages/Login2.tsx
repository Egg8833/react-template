import React, {useState} from 'react'
import {Button, Typography, Paper, Box} from '@mui/material'
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import SelectBase from '@/components/RHForm/SelectBase'
import InputBase from '@/components/RHForm/InputBase'
import CaptchaCanvas from '@/components/CaptchaCanvas'

import {
  login2Schema,
  login2DefaultValues,
  Login2FormData,
} from '@/type/login2Schema'

const Login2: React.FC = () => {
  const methods = useForm<Login2FormData>({
    mode: 'all',
    resolver: zodResolver(login2Schema),
    defaultValues: login2DefaultValues,
  })

  const {handleSubmit} = methods

  const onSubmit: SubmitHandler<Login2FormData> = data => {
    console.log(data)
    if (data.captcha !== captchaCode) {
      alert('驗證碼錯誤')
      setTrigger(prev => prev + 1)
      methods.setValue('captcha', '')
      methods.setError('captcha', {
        type: 'manual',
        message: '驗證碼錯誤',
      })
      return
    }
    alert('登入成功')
  }

  const lineOptions = [
    {value: 'F999000', label: 'F999000'},
    {value: 'F888000', label: 'F888000'},
  ]

  const brokerOptions = [
    {value: 'F999000', label: 'F999000'},
    {value: 'F888000', label: 'F888000'},
  ]

  const [captchaCode, setCaptchaCode] = useState('')
  const [trigger, setTrigger] = useState(0)

  return (
    <Box sx={{width: '600px', margin: 'auto', marginTop: '50px'}}>
      <Paper elevation={3} sx={{padding: 8}}>
        <FormProvider {...methods}>
          <form className="w-300px mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" align="center" gutterBottom>
              登入
            </Typography>
            <div className="flex flex-col gap-4">
              <SelectBase
                selectName="線路期貨商"
                selectId="lineBroker"
                options={lineOptions}
                labelWidth="100px"
                selectWidth="300px"
                labelRow={false}
              />
              <SelectBase
                selectName="期貨商代號"
                selectId="brokerCode"
                options={brokerOptions}
                labelWidth="100px"
                selectWidth="300px"
                labelRow={false}
              />
              <InputBase
                placeholder="請輸入帳號"
                inputName="登入帳號"
                inputId="account"
                labelWidth="100px"
                inputWidth="300px"
                labelRow={false}
              />
              <InputBase
                placeholder="請輸入密碼"
                inputName="密碼"
                inputId="password"
                labelWidth="100px"
                inputWidth="300px"
                labelRow={false}
                type="password"
              />

              <InputBase
                placeholder="請輸入驗證碼"
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
              </InputBase>

              <p>驗證碼：{captchaCode}</p>
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{width: '300px', mt: 1}}>
              登入
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </Box>
  )
}

export default Login2
