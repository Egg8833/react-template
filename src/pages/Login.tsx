import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Typography, Paper, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import InputBase from '@/components/InputBase';
import Input from '@/components/Input';

interface FormState {
  account: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    account: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ account: boolean; password: boolean }>({
    account: false,
    password: false,
  });

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'rememberMe' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 清除錯誤訊息
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleLogin = () => {
    const { account, password } = formData;
    const newErrors = {
      account: !account.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    if (newErrors.account || newErrors.password) return;

    alert(`帳號: ${formData.account}\n密碼: ${formData.password}\n記住我: ${formData.rememberMe}`);
  };

  return (
    <Box sx={{ margin: 'auto', marginTop: '100px' }}>
      <Paper elevation={3} sx={{ padding: 12, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          登入
        </Typography>
        <div className='flex flex-col gap-4'>

        <InputBase
          inputName="帳號"
          inputId="account"
          labelWidth="35px"
          inputWidth='300px'
          labelRow={false}
          value={formData.account}
          onChange={handleChange('account')}
          error={errors.account}
        />
        <InputBase
          inputName="密碼"
          inputId="password"
          labelWidth="35px"
          inputWidth='300px'
          labelRow={false}
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          type="password"
        />
        <FormControlLabel
          control={<Checkbox checked={formData.rememberMe} onChange={handleChange('rememberMe')} />}
          label="Remember Me"
          sx={{  }}
          />
          </div>
        <Button
          variant="contained"
          fullWidth
          sx={{
            width:'300px',
            mt: 1,
            '& .MuiButton-startIcon': { },
          }}
          startIcon={<LockIcon />}
          onClick={handleLogin}

        >
          <span className='text-lg mx-auto'>
          登入
          </span>
        </Button>
        <Input/>
      </Paper>
    </Box>
  );
};

export default Login;
