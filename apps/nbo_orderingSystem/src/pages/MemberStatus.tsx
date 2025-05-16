import { Button, Box, Typography } from '@mui/material'
import { CustomDataTable } from '@/components/CustomDataTable'
import { GridColDef } from '@mui/x-data-grid'
const MemberStatus = () => {

  const columnsAccount: GridColDef[] = [
    { field: 'futuresId', headerName: '期貨商代號', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'account', headerName: '帳號', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'role', headerName: '帳號身份', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'maxAccounts', headerName: '可申請帳號上限數量', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: '啟用狀態',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => (
        <Typography color={params.value === '鎖定' ? 'error' : 'inherit'}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '功能',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {params.row.status === '啟用' && (
            <>
              <Button   variant="contained" color="primary" size="small">鎖定</Button>
              <Button   variant="contained" color="error" size="small">禁用</Button>
            </>
          )}
          {params.row.status === '鎖定' && (
            <>
              <Button   variant="contained" color="success" size="small">解除</Button>
              <Button   variant="contained" color="error" size="small">禁用</Button>
            </>
          )}
          {params.row.status === '禁用' && (
            <Button   variant="contained" color="primary" size="small">啟用</Button>
          )}
        </Box>
      ),
    },
  ]

  const rowsAccount = [
  { id: 1, futuresId: 'F123', account: '', role: '管理者', maxAccounts: '', status: '啟用' },
  { id: 2, futuresId: 'F234', account: '', role: '', maxAccounts: '', status: '啟用' },
  { id: 3, futuresId: 'F234', account: '', role: '', maxAccounts: '', status: '啟用' },
  { id: 4, futuresId: 'F234', account: '', role: '', maxAccounts: '', status: '鎖定' },
  { id: 5, futuresId: 'F345', account: '', role: '', maxAccounts: '', status: '禁用' },
  { id: 6, futuresId: 'F345', account: '', role: '', maxAccounts: '', status: '啟用' },
]

  return (
    <Box sx={{ width: '95%', overflowX: 'auto', p: 2 }}>
      <h2>會員狀態管理</h2>
        <Box sx={{ minWidth: 800, mt: 3 }}>
              <CustomDataTable rows={rowsAccount} columns={columnsAccount} />
            </Box>
    </Box>
  )
}

export default MemberStatus