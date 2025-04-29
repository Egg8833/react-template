import {Box, Paper, Button} from '@mui/material'

const Delegation = () => {
  return (
    <Box sx={{width: '100%'}}>
      <Paper elevation={3}>
        <div className="flex justify-between items-center bg-blue-100  p-2 h-[48px]">
          <span className=" text-blue-500">造勢者委託 </span>
          <Button
            type="button"
            variant="contained"
            color="error"
            sx={{width: '140px', height: '32px'}}>
            清除所有內容
          </Button>
        </div>

        <div className="bg-gray-100 h-[60px] flex items-center justify-end pr-4 gap-3">
          <Button
            type="submit"
            variant="outlined"
            color="info"
            sx={{width: '120px', height: '40px', color: '#000'}}>
            送出
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="info"
            sx={{width: '120px', height: '40px', color: '#000'}}>
            取消
          </Button>
        </div>
      </Paper>
    </Box>
  )
}

export default Delegation
