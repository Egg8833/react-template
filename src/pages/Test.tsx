import {useState} from 'react'
import {Button} from '@mui/material'
import {useForm,FormProvider,Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormData,schema,defaultValues} from '@/type/schema'
import {DevTool} from '@hookform/devtools'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import TableMarket from '@/components/TableMarket'
import ToggleButtonGroup from '@/components/ToggleButtonGroup'
import InputBase from '@/components/RHForm/InputBase'
import SelectBase from '@/components/RHForm/SelectBase'
import Input from '@/components/Input'
import BasicModal from '@/components/BasicModal'
import { LoginPayload } from '@/type/auth'
import { useLoginMutation } from '@/hooks/useLoginMutation'

const Test = () => {
   const loginMutation = useLoginMutation()
   const methods  = useForm<FormData>({
    mode: 'all', resolver: zodResolver(schema),defaultValues})
    const {  handleSubmit,control } = methods;

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
  const orderOptions = [
    {value: 'ROD', label: 'ROD 當日有效'},
    {value: 'FOK', label: 'FOK'},
    {value: 'IOC', label: 'IOC'},
  ]


  // 提交表單
const onSubmit = (form: FormData) => {
  console.log('Form Data:', form)

  const loginData: LoginPayload = {
    UserID: '1030759',      // 可替換成 form.account
    UserCyph: '!QAZ3edc'    // 可替換成 form.password
  }

  loginMutation.mutate(loginData)
}



  return (

    <div className="">

    <FormProvider {...methods}>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <InputBase
          inputName="委託書編號"
          inputId="account"
          labelWidth="150px"


          children={
            <div className="flex items-center gap-4">
              <span>icon</span>
              <span>流水號</span>
              <InputBase
                inputName="流水號"
                inputId="flowNo"
                inputWidth="70px"
                showLabel={false}
                errorStyleMb={false}

              />
            </div>
          }
        />
        <InputBase
          inputName="name"
          inputId="name"
          labelWidth="150px"

        />
        <InputBase
          inputName="email"
          inputId="email"
          labelWidth="150px"

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
          labelWidth="150px"
          labelRow={false}
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
      <Button
        loading={loginMutation.isPending}
        type="submit"
        variant="contained"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        提交
      </Button>
       <Controller
        name="checkName"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="你好棒"
          />
        )}
      />
  {loginMutation.isPending && <p>Loading...</p>}
    </form>
    <DevTool control={methods.control
    } ></DevTool>
    </FormProvider>
    <div className="pl-4">
    <TableMarket/>
    </div>
    <ToggleButtonGroup/>
    </div>
  )
}

export default Test
