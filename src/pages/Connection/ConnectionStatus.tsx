import React from 'react';
import { Box, Paper } from '@mui/material';

const ConnectionStatus = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3}>
        <h4 className='bg-blue-100 h-[40px] p-2 text-blue-500'>連線狀態查詢</h4>
        <div>
          內容
        </div>
        <div className='bg-gray-100 h-[40px]'></div>
      </Paper>
    </Box>
  );
};

export default ConnectionStatus;
