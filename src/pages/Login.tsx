import React from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {FormLoginData,schema,defaultValues} from '@/type/loginSchema'
import {zodResolver} from '@hookform/resolvers/zod'

import LockIcon from '@mui/icons-material/Lock';
import InputBase from '@/components/RHForm/InputBase';
import CheckboxBase from '@/components/RHForm/checkBoxBase';
const Login: React.FC = () => {
  const methods = useForm<FormLoginData>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormLoginData> = (data) =>{
    console.log(data);
  }

  return (
    <Box sx={{ width: '600px', margin: 'auto',marginTop: '100px' }}>
      <Paper elevation={3} sx={{ padding: 12, textAlign: 'center' }}>
        <FormProvider {...methods}>
          <form className="w-300px mx-auto"
          onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom>
              登入
            </Typography>
            <div className="flex flex-col gap-4">
              {/* 帳號輸入框 */}
              <InputBase
                inputName="帳號"
                inputId="account"
                labelWidth="35px"
                inputWidth="300px"
                labelRow={false}
              />
              {/* 密碼輸入框 */}
              <InputBase
                inputName="密碼"
                inputId="password"
                labelWidth="35px"
                inputWidth="300px"
                labelRow={false}
                type="password"

              />
              {/* 記住我選項 */}
              <CheckboxBase name="rememberMe" label='記住我' />
            </div>
            {/* 登入按鈕 */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ width: '300px', mt: 1 }}
              startIcon={<LockIcon />}
            >
              <span className="text-lg mx-auto">登入</span>
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default Login;
