import React, {useState} from 'react'

import {Button, Typography, Paper, Box, FormControlLabel} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import SelectBaseFormHook from '@/components/RHForm/SelectBaseFormHook'
import InputBaseFormHook from '@/components/RHForm/InputBaseFormHook'
import SelectBase from '@/components/SelectBase'
import InputBase from '@/components/InputBase'
import CaptchaCanvas from '@/components/CaptchaCanvas'
import ToggleButtonGroup from '@/components/ToggleButtonGroup'
import CustomSnackbar from '@/components/CustomSnackbar'

import {
  login2Schema,
  login2DefaultValues,
  Login2FormData,
} from '@/type/login2Schema'

const Login2: React.FC = () => {
  const [selected, setSelected] = useState('left')
  const [captchaCode, setCaptchaCode] = useState('')
  const [trigger, setTrigger] = useState(0)

  const [snackbarObj, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: '' as 'success' | 'error',
  })

  const methods = useForm<Login2FormData>({
    mode: 'all',
    resolver: zodResolver(login2Schema),
    defaultValues: login2DefaultValues,
  })

  const {handleSubmit} = methods

  const onSubmit: SubmitHandler<Login2FormData> = data => {
    console.log(data)

    // 驗證碼錯誤
    if (data.captcha !== captchaCode) {
      setTrigger(prev => prev + 1)
      methods.setValue('captcha', '')
      methods.setError('captcha', {
        type: 'manual',
        message: '驗證碼錯誤',
      })
      return
    }

    // setOpenSnackbar({
    //     open: true,
    //     message: '帳號密碼錯誤',
    //     severity: 'error',
    //   })

    setOpenSnackbar({
      open: true,
      message: '請至信箱收取驗證信',
      severity: 'success',
    })
  }



  const lineOptions = [
    {value: 'F999000', label: 'F999000'},
    {value: 'F888000', label: 'F888000'},
  ]

  const [emailCode, setEmailCode] = useState('sd')

  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('輸入的驗證碼是:', emailCode)

    // setOpenSnackbar({
    //   open: true,
    //   message: '信箱驗證成功',
    //   severity: 'success',
    // })

    setOpenSnackbar({
      open: true,
      message: '驗證碼錯誤',
      severity: 'error',
    })
    // 你可以在這裡執行 API 請求或驗證邏輯
  }
  const [checked, setChecked] = React.useState(true)
  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    console.log('check', checked)
    setChecked(checked)
  }

  const [value, setValue] = useState("");

  const handleChange2 = (e: React.ChangeEvent<{ value: unknown }>) => {
    setValue(e.target.value as string);
  };



  return (
    <>
      <Box sx={{width: '600px', margin: 'auto', marginTop: '50px'}}>
        <Paper elevation={3} sx={{padding: 8}}>
          <FormProvider {...methods}>
            <form className="w-300px mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h5" align="center" sx={{mb: 3}}>
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
                {/* <SelectBase
                  showLabel={false}
                  selectName="期貨商代號"
                  selectId="brokerCode"
                  options={brokerOptions}
                  labelWidth="100px"
                  selectWidth="300px"
                  labelRow={false}
                /> */}
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
                sx={{width: '300px', mt: 1}}>
                登入
              </Button>
              <p className="text-red-500 text-center">
                忘記帳號、密碼請洽期交所IT人員
              </p>
            </form>
          </FormProvider>
        </Paper>
      </Box>
      <Box sx={{width: '600px', margin: 'auto', marginTop: '50px'}}>
        <Paper elevation={3} sx={{padding: 6}}>
          <Typography variant="h5" align="center" sx={{mb: 3}}>
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
                // error={!!emailCode}
                // helperText=''
                onChange={e => setEmailCode(e.target.value)}
                labelRow={false}
              />

              <Button
                // disabled={!emailCode}
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
      <Box sx={{width: '1200px', margin: 'auto', marginTop: '50px'}}>
        <Paper elevation={3}>
          <div className="bg-[#f5f5f5] h-[40px] text-center text-blue">
            <h4 className="text-[16px] font-bold text-center pt-2">身分確認</h4>
          </div>
          <div className="p-4">
            <h5 className="text-[16px] font-bold text-blue">連線帳號</h5>
            <div className="flex gap-1">
              <InputBase
                inputName="結算會員"
                inputId="Account"
                inputWidth="120px"
                value={emailCode}
                onChange={e => setEmailCode(e.target.value)}
                labelRow={false}
                disabled
              />
              <InputBase
                inputName="線路期貨商"
                inputId="lineCode"
                inputWidth="150px"
                value={emailCode}
                onChange={e => setEmailCode(e.target.value)}
                labelRow={false}
                disabled
              />
              <InputBase
                inputName="櫃號"
                inputId="boothNo"
                inputWidth="70px"
                value={emailCode}
                onChange={e => setEmailCode(e.target.value)}
                labelRow={false}
              />

              <SelectBase
                labelRow={false}
                selectName="選項"
                selectId="orderType"
                options={lineOptions}
                value={value}
                onChange={handleChange2}
                // error={true}
                // helperText={value}
              />
            </div>
            <h5 className="m-0 text-[16px] font-bold text-blue">
              交易提示功能
            </h5>
            <div className="flex flex-col">
              <FormControlLabel
                control={<Checkbox />}
                checked={checked}
                onChange={handleChange}
                label="下單時再次確認委託單"
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={checked}
                onChange={handleChange}
                label="刪單減量-檢查委託單"
              />
            </div>
          </div>
          <div className="flex justify-center pb-2">
            <Button variant="outlined" sx={{width: '120px'}}>
              取消
            </Button>
            <Button
              variant="contained"
              sx={{marginLeft: '10px', width: '120px'}}>
              確認
            </Button>
          </div>
        </Paper>
      </Box>

      <CustomSnackbar
        open={snackbarObj.open}
        message={snackbarObj.message}
        severity={snackbarObj.severity}
        onClose={() => setOpenSnackbar({...snackbarObj, open: false})}
        autoHideDuration={3000}
      />
    </>
  )
}

export default Login2
