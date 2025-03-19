import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Button, Box, Typography } from '@mui/material'
import { CustomDataTable } from '@/components/CustomDataTable'

// 第一張圖片表格的欄位設定
const columnsFutures: GridColDef[] = [
  { field: 'futuresId', headerName: '期貨商代號', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'account', headerName: '帳號', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'session', headerName: '盤別', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'product1', headerName: '商品1', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'product2', headerName: '商品2', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'product3', headerName: '商品3', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'product4', headerName: '商品4', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'product5', headerName: '商品5', flex: 1, align: 'center', headerAlign: 'center' },
  {
    field: 'actions',
    headerName: '功能',
    minWidth: 200,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: params => (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 ,alignItems: 'center' ,height: '100%' ,}}>
        <Button   variant="contained" color="primary" size="small" onClick={() => handleEdit(params.row.futuresId)}>修改</Button>
        <Button   variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.futuresId)}>刪除</Button>
      </Box>

    ),
  },
]



const rowsFutures = [
  { id: 1, futuresId: 'F123', account: '', session: '日盤期貨', product1: 'TXF', product2: 'CDF', product3: '', product4: '', product5: '' },
  { id: 2, futuresId: 'F123', account: '', session: '夜盤選擇權', product1: 'TXO', product2: '', product3: '', product4: '', product5: '' },
  { id: 3, futuresId: 'F234', account: '', session: '', product1: '', product2: '', product3: '', product4: '', product5: '' },
  { id: 4, futuresId: 'F234', account: '', session: '', product1: '', product2: '', product3: '', product4: '', product5: '' },
  { id: 5, futuresId: 'F234', account: '', session: '', product1: '', product2: '', product3: '', product4: '', product5: '' },
  { id: 6, futuresId: 'F345', account: '', session: '', product1: '', product2: '', product3: '', product4: '', product5: '' },
]



const handleEdit = (id: string) => {
  alert(`編輯 ${id}`)
}

const handleDelete = (id: string) => {
  alert(`刪除 ${id}`)
}

const FuturesTable: React.FC = () => {
  return (
    <Box sx={{ width: '95%', overflowX: 'auto', p: 2 }}>
      <h2>期貨商品設定</h2>
      <Box sx={{ minWidth: 800 }}>
        <CustomDataTable rows={rowsFutures} columns={columnsFutures} />
      </Box>


    </Box>
  )
}

export default FuturesTable
