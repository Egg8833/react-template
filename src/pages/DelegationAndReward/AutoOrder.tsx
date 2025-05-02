import { Box, Paper, Button } from '@mui/material'
import React, { useState } from 'react'
import SelectBase from '@/components/RHForm/SelectBaseFormHook'
import InputBase from '@/components/RHForm/InputBaseFormHook'
import CheckBoxBaseFormHook from '@/components/RHForm/checkBoxBaseFormHook'
import { GridColDef } from '@mui/x-data-grid'
import { CustomDataTable } from '@/components/CustomDataTable'

const columns: GridColDef[] = [
  { field: 'time', headerName: '委託時間', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'broker', headerName: '期貨商代號', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'code', headerName: '委託書編號', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'account', headerName: '交易人帳號', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'idType', headerName: '身分碼', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'orderType', headerName: '委託類別', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'repeatTime', headerName: '複式單種類', flex: 1, align: 'center', headerAlign: 'center' },
  {
    field: 'buySell',
    headerName: '買賣別',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ value }) => (
      <span style={{ color: value === '買進' ? 'red' : 'green' }}>{value}</span>
    ),
  },
  { field: 'qty', headerName: '委託口數', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'price', headerName: '委託價格', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'condition', headerName: '委託條件', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'inventory', headerName: '倉別', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'product', headerName: '商品代號', flex: 1, align: 'center', headerAlign: 'center' },
]

const rows = [
  {
    id: 1,
    time: '13:48:07',
    broker: '限價',
    code: 'S00G',
    account: '00024',
    idType: '1',
    orderType: '限價',
    repeatTime: '13:48:07',
    buySell: '賣出',
    qty: 0,
    price: 0,
    condition: 'ROD',
    inventory: '新倉',
    product: 'BRFB4/F4',
  },
  {
    id: 2,
    time: '13:48:07',
    broker: '限價',
    code: 'S00G',
    account: '00024',
    idType: '1',
    orderType: '限價',
    repeatTime: '13:48:07',
    buySell: '買進',
    qty: 0,
    price: 0,
    condition: 'ROD',
    inventory: '新倉',
    product: 'BRFB4/F4',
  },
]



const AutoOrder = () => {
  const [formState, setFormState] = useState({
    account: '',
    traderType: '0:本國法人',
    delegation: false,
  });
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper elevation={3}>
          <div className="flex justify-between items-center bg-blue-100  p-2 h-[48px]">
            <span className=" text-blue-500">自動下單功能 </span>
            <Button
              type="button"
              variant="contained"
              color="error"
              sx={{ width: '140px', height: '32px' }}>
              清除所有內容
            </Button>
          </div>
          <div className="p-4 flex gap-4">
            <div>
              <p className='mb-3'>交易人身分與委託書號確認</p>
              <div className='flex gap-2'>
                <InputBase
                  inputName='交易人帳號(7碼)'
                  inputId='account'
                  placeholder="請輸入交易人帳號(7碼)"
                  value={formState.account}
                  onChange={(e) => setFormState({ ...formState, account: e.target.value })}
                  labelRow={false}
                  useRHF={false}
                />
                <SelectBase
                  selectName='身分碼'
                  selectId='traderType'
                  options={[
                    { value: "0:本國法人", label: "本國法人" },
                    { value: "1:本國自然人", label: "本國自然人" },
                    { value: "2:外國法人", label: "外國法人" },
                    { value: "3:外國自然人", label: "外國自然人" },
                  ]}
                  value={formState.traderType}
                  useRHF={false}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => setFormState({ ...formState, traderType: e.target.value as string })}
                  labelRow={false}

                />
              </div>
            </div>
            <div>
              <p className='mb-3'>檔案上傳</p>
              <div className='flex gap-4 items-center mb-4'>
                <span className='inline-block w-[120px]'>匯入委託資料</span>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{ width: '240px', color: '#000' }}>
                  一般【期貨】委託檔匯入
                </Button>
                <span>檔名： ****.csv</span>
              </div>
              <div className='flex gap-4 items-center mb-6'>
                <span className='inline-block w-[120px]'>下載範例</span>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{ width: '240px', color: '#000' }}>
                  一般【選擇權】委託檔匯入
                </Button>
                <span>檔名： ****.csv</span>
              </div>
              <div className="flex items-center gap-2">
                <span className='inline-block w-[140px]'>類別</span>
                <CheckBoxBaseFormHook
                  name="enable_conditions"
                  label="啟用觸發條件"
                  checked={formState.delegation ?? false}
                  onChange={(e) => setFormState({ ...formState, delegation: e.target.checked })}
                  useRHF={false}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-100 h-[60px] flex items-center justify-end pr-4 gap-3">
            <Button
              type="submit"
              variant="outlined"
              color="info"
              sx={{ width: '120px', height: '40px', color: '#000' }}
              onClick={() => {
                // 提交表單的邏輯
                console.log('Form submitted:', formState);
              }}
            >
              送出
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="info"
              sx={{ width: '120px', height: '40px', color: '#000' }}>
              取消
            </Button>
          </div>
        </Paper>
      </Box>

      <Box sx={{ width: '100%', marginTop: '20px' }}>
        <Paper elevation={3}>
          <div className="flex justify-between items-center bg-blue-100  p-2 h-[48px]">
            <span className=" text-blue-500">自動下單功能 </span>
          </div>
          <div>
            <CustomDataTable
              rows={rows}
              columns={columns}
              getRowClassName={(params: any) =>
                params.row.buySell === '買進'
                  ? 'buy-row'
                  : params.row.buySell === '賣出'
                    ? 'sell-row'
                    : ''
              }
              customStyles={{
                '& .buy-row': {
                  backgroundColor: '#ffe5e5',
                  '&:hover': {
                    backgroundColor: '#fff5f5',
                  },
                },
                '& .sell-row': {
                  backgroundColor: '#eaffea',
                  '&:hover': {
                    backgroundColor: '#f5fff5',
                  },
                },
              }}
            />

          </div>
        </Paper>
      </Box>
    </>
  )
}

export default AutoOrder