import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Paper, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    alert(`帳號: ${account}\n密碼: ${password}\n記住我: ${rememberMe}`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 320, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          登入
        </Typography>
        <TextField
          label="帳號"
          variant="outlined"
          fullWidth
          margin="normal"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <TextField
          label="密碼"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Remember Me"
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          startIcon={<LockIcon />}
          onClick={handleLogin}
        >
          登入
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
