import React, { useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { CustomDataTable } from '@/components/CustomDataTable'
// 定義會員權限介面
interface MemberPermission {
  id: number;
  role: string;
  quota: boolean;
  fileTransfer: boolean;
  pendingOrders: boolean;
  autoOrder: boolean;
  reportPrint: boolean;
}

// 權限資料
const initialRows: MemberPermission[] = [
  { id: 1, role: '管理者', quota: true, fileTransfer: true, pendingOrders: true, autoOrder: true, reportPrint: true },
  { id: 2, role: '測試人員', quota: true, fileTransfer: true, pendingOrders: false, autoOrder: true, reportPrint: true },
  { id: 3, role: '期貨商主帳號', quota: true, fileTransfer: false, pendingOrders: false, autoOrder: false, reportPrint: false },
  { id: 4, role: '期貨商', quota: true, fileTransfer: false, pendingOrders: true, autoOrder: false, reportPrint: false },
  { id: 5, role: '結算會員', quota: false, fileTransfer: false, pendingOrders: true, autoOrder: false, reportPrint: false },
  { id: 6, role: '公司成員', quota: false, fileTransfer: false, pendingOrders: false, autoOrder: false, reportPrint: false },
];

const PermissionTable: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [editableRow, setEditableRow] = useState<number | null>(null);

  // 切換編輯模式
  const toggleEdit = (id: number) => {
    setEditableRow(editableRow === id ? null : id);
  };

  // 點擊儲存格時，切換 `true` ↔ `false`
  const handleCellClick = (id: number, field: keyof MemberPermission) => {
    if (editableRow !== id || field === 'role' || field === 'actions') return;

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: !row[field] } : row
      )
    );
  };

  // 自訂 `renderCell`，點擊時切換 `✔️` 或空白
  const renderCheckCell = (params: GridRenderCellParams) => {
    const field = params.field as keyof MemberPermission;
    const isEditable = editableRow === params.row.id;

    return (
      <Box
        sx={{
          cursor: isEditable ? 'pointer' : 'default',
          textAlign: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => handleCellClick(params.row.id, field)}
      >
        {params.value ? '✔️' : '✖️'}
      </Box>
    );
  };

  const columns: GridColDef[] = [
    { field: 'role', headerName: '會員身份', flex: 1, align: 'center',
    headerAlign: 'center' },
    {
      field: 'quota',
      headerName: '鈴額申報委託',
      flex: 1,
       align: 'center',
    headerAlign: 'center',
      renderCell: renderCheckCell
    },
    {
      field: 'fileTransfer',
      headerName: '檔案傳輸',
      flex: 1,
       align: 'center',
    headerAlign: 'center',
      renderCell: renderCheckCell
    },
    {
      field: 'pendingOrders',
      headerName: '未成交委託檔訂閱功能',
      flex: 1,
       align: 'center',
    headerAlign: 'center',
      renderCell: renderCheckCell
    },
    {
      field: 'autoOrder',
      headerName: '自動下單功能',
      flex: 1,
       align: 'center',
    headerAlign: 'center',
      renderCell: renderCheckCell
    },
    {
      field: 'reportPrint',
      headerName: '列印報表功能',
      flex: 1,
       align: 'center',
    headerAlign: 'center',
      renderCell: renderCheckCell
    },
    {
      field: 'actions',
      headerName: '權限管理',
      flex: 1,
       align: 'center',
    headerAlign: 'center',
      renderCell: (params) => (
        <Button
          variant="contained"
          color={editableRow === params.row.id ? 'secondary' : 'primary'}
          size="small"
          onClick={() => toggleEdit(params.row.id)}
        >
          {editableRow === params.row.id ? '儲存' : '調整'}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: '95%', overflowX: 'auto', p: 2 }}>
      <h2>會員權限管理</h2>
      <CustomDataTable
        rows={rows}
        columns={columns}  />
    </Box>
  );
};

export default PermissionTable;