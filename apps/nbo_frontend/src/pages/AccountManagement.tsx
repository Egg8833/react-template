import React from 'react'
import {GridColDef} from '@mui/x-data-grid'
import {Button, Box} from '@mui/material'
import {CustomDataTable} from '@/components/CustomDataTable'
import {useCounterStore} from '@/store/counterStore'
import {MuiTableFooterHideCss} from '@/constants'
interface Member {
  id: number
  account: string
  identity: string
  password: string
  email: string
  errorCount: number
  unlockTime: string
  lastUpdate: string
}

const MemberTable: React.FC = () => {
  const count = useCounterStore(state => state.count)
  const {increment, decrement} = useCounterStore()
  console.log(count)
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '期貨商代號',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'account',
      headerName: '帳號',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'identity',
      headerName: '會員身份',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'password',
      headerName: '密碼',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'email',
      headerName: '聯絡 Email 列表',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'errorCount',
      headerName: '登入錯誤次數',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'unlockTime',
      headerName: '鎖定後自動解鎖時間',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastUpdate',
      headerName: '登入密碼最後更新時間',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: '功能',
      flex: 2,
      headerAlign: 'center',
      minWidth: 200,
      renderCell: params => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            height: '100%',
          }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}>
            修改
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}>
            刪除
          </Button>
        </Box>
      ),
    },
  ]

  // 測試用假資料 (產生 20 筆資料)
  const rows: Member[] = Array.from({length: 20}, (_, index) => ({
    id: index + 1,
    account: `user00${index + 1}`,
    identity: index % 2 === 0 ? '一般會員' : 'VIP',
    password: '******',
    email: `user00${index + 1}@example.com`,
    errorCount: Math.floor(Math.random() * 5),
    unlockTime: index % 2 === 0 ? 'N/A' : `2024-03-19 10:0${index % 10}`,
    lastUpdate: `2024-03-${10 + (index % 10)}`,
  }))

  const handleEdit = (id: number) => {
    alert(`編輯會員 ID: ${id}`)
  }

  const handleDelete = (id: number) => {
    alert(`刪除會員 ID: ${id}`)
  }
  return (
    <Box
      sx={{
        width: '95%',
        overflowX: 'auto',
        p: 2,
      }}>
      <h2 className="m-0 mb-2 ">會員帳號管理 {count}</h2>
      <Box sx={{minWidth: 800}}>
        <CustomDataTable
          rows={rows}
          columns={columns}
          customStyles={MuiTableFooterHideCss}
        />
      </Box>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
    </Box>
  )
}

export default MemberTable
