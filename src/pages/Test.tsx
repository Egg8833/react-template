import React, {useState} from 'react'
import InputBase from '@/components/InputBase'
import SelectBase from '@/components/SelectBase'
import Input from '@/components/Input'
import BasicModal from '@/components/BasicModal'
import {SelectChangeEvent, Button} from '@mui/material'

const Test = () => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
  const orderOptions = [
    {value: 'ROD', label: 'ROD 當日有效'},
    {value: 'FOK', label: 'FOK'},
    {value: 'IOC', label: 'IOC'},
  ]

  // 集中管理所有輸入框的狀態
  const [formData, setFormData] = useState({
    account: '',
    password: '',
    nickname: '',
    flowNo: '',
    orderType: orderOptions[0].value, // 預設選擇第一個選項
  })

  const [errors, setErrors] = useState({
    account: false,
    password: false,
    nickname: false,
  })

  // 更新表單資料
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
      setFormData(prev => ({...prev, [field]: e.target.value}))
      if (e.target.value.trim() !== '') {
        setErrors(prev => ({...prev, [field]: false}))
      }
    }

  // 表單驗證
  const validateForm = () => {
    const newErrors = {account: false, password: false, nickname: false}
    let isValid = true

    Object.keys(newErrors).forEach(key => {
      if (formData[key as keyof typeof formData].trim() === '') {
        newErrors[key as keyof typeof newErrors] = true
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // 提交表單
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('✅ 表單資料：', formData)
      alert('表單提交成功！')
    } else {
      console.log('❌ 表單驗證失敗！')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <InputBase
          inputName="委託書編號"
          inputId="account"
          labelWidth="150px"
          value={formData.account}
          onChange={handleChange('account')}
          error={errors.account}

          children={
            <div className="flex items-center gap-4">
              <span>icon</span>
              <span>流水號</span>
              <InputBase
                inputName="流水號"
                inputId="flowNo"
                inputWidth="70px"
                showLabel={false}
                value={formData.flowNo}
                onChange={handleChange('flowNo')}
                error={errors.account}
              />
            </div>
          }
        />
        <InputBase
          inputName="商品"
          inputId="password"
          labelWidth="150px"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
        />
        <InputBase
          inputName="商品代號"
          inputId="nickname"
          labelWidth="150px"
          value={formData.nickname}
          onChange={handleChange('nickname')}
          error={errors.nickname}
        />
        <Input/>
        <div>
          <label
            style={{
              width: '150px',
              display: 'inline-block',
              marginRight: '8px',
            }}
            htmlFor="orderType">
            買賣別
          </label>
          <Button variant="outlined" color="primary" size="medium" sx={{width: '90px'}}>
            買入
          </Button>
          <Button variant="outlined" color="primary" size="medium" sx={{width: '90px', marginLeft: '20px'}}>
            賣出
          </Button>
        </div>

        <SelectBase
          selectName="訂單類型"
          selectId="orderType"
          value={formData.orderType}
          labelWidth="150px"
          labelRow={false}
          onChange={handleChange('orderType')}
          options={orderOptions}

        />
         <BasicModal propsOpen={open} setOpen={setOpen} title='這是MOdal' triggerType='text' ModalWidth={600}
        children={
          <>
            這是內容
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto quod, dolores vero cupiditate quasi illum perspiciatis esse totam illo minima ipsum voluptatem! In magnam at voluptatum iure repellat dolore. Tempore?</p>

          </>}
         />
        handleOpen:{JSON.stringify(open)}

         <Button onClick={handleOpen}
         variant="outlined" color="primary" size="medium" sx={{width: '90px', marginLeft: '20px'}}>
            開啟Modal
          </Button>
           <Button onClick={handleClose}
         variant="outlined" color="primary" size="medium" sx={{width: '90px', marginLeft: '20px'}}>
            開啟Modal
          </Button>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        提交
      </button>
    </form>
  )
}

export default Test
