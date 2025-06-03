import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const OptionsOrder = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3}>
        <h4 className='bg-blue-100 h-[40px] p-2 text-blue-500'>選擇權委託(含鉅額單式)</h4>
        <div>
          內容
        </div>
        <div className='bg-gray-100 h-[40px]'></div>
      </Paper>
    </Box>
  );
};

export default OptionsOrder;
