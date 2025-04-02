import React, { useState } from 'react';
import { Box, Typography, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface FuturesRow {
  key: number;
  futuresId: string;
  account: string;
  session: string;
  product1: string;
  product2: string;
  address: string;
  children?: FuturesRow[];
}

const columnWidths = {
  toggle: '40px',
  futuresId: '120px',
  account: '100px',
  session: '120px',
  product1: '100px',
  product2: '100px',
  address: '200px',
  actions: '120px'
};

const rowsFutures: FuturesRow[] = [
  {
    key: 1,
    futuresId: 'F123',
    account: 'A001',
    session: '日盤期貨',
    product1: 'TXF',
    product2: 'CDF',
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        futuresId: 'F123',
        account: 'A002',
        session: '夜盤選擇權',
        product1: 'TXO',
        product2: '',
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        futuresId: 'F234',
        account: 'A003',
        session: '',
        product1: '',
        product2: '',
        address: 'New York No. 3 Lake Park',
      },
    ],
  },
  {
    key: 2,
    futuresId: 'F567',
    account: 'A004',
    session: '日盤期貨',
    product1: 'TXF',
    product2: 'CDF',
    address: 'Sydney No. 1 Lake Park',
  },
];

const FuturesTable = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const handleEdit = (id: string) => {
    alert(`編輯 ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`刪除 ${id}`);
  };

  const toggleRow = (id: number) => {
    setOpenRow(openRow === id ? null : id);
  };

  const renderRows = (data: FuturesRow[], isNested = false) => {
    return data.map((row) => (
      <React.Fragment key={row.key}>
        <TableRow>
          <TableCell style={{ width: columnWidths.toggle }}>
            {!isNested && row.children && (
              <IconButton size="small" onClick={() => toggleRow(row.key)}>
                {openRow === row.key ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>
          <TableCell align="center" style={{ width: columnWidths.futuresId }}>{row.futuresId}</TableCell>
          <TableCell align="center" style={{ width: columnWidths.account }}>{row.account}</TableCell>
          <TableCell align="center" style={{ width: columnWidths.session }}>{row.session}</TableCell>
          <TableCell align="center" style={{ width: columnWidths.product1 }}>{row.product1}</TableCell>
          <TableCell align="center" style={{ width: columnWidths.product2 }}>{row.product2}</TableCell>
          <TableCell align="center" style={{ width: columnWidths.address }}>{row.address}</TableCell>
          <TableCell align="center" style={{ width: columnWidths.actions }}>
            <button onClick={() => handleEdit(row.futuresId)}>修改</button>
            <button onClick={() => handleDelete(row.futuresId)}>刪除</button>
          </TableCell>
        </TableRow>
        {!isNested && row.children && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={openRow === row.key} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
                    <TableBody>
                      {renderRows(row.children, true)}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    ));
  };

  // 表頭樣式
  const headCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5'
  };

  return (
    <Box sx={{ width: '95%', overflowX: 'auto', p: 2 }}>
      <Typography variant="h6">期貨商品設定</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed', width: '100%', border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...headCellStyle, width: columnWidths.toggle }}></TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.futuresId }}>期貨商代號</TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.account }}>帳號</TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.session }}>盤別</TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.product1 }}>商品1</TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.product2 }}>商品2</TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.address }}>地址</TableCell>
              <TableCell align="center" style={{ ...headCellStyle, width: columnWidths.actions }}>功能</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows(rowsFutures)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FuturesTable;