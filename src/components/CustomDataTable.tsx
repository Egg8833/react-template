import React from 'react';
import { DataGrid, GridColDef, DataGridProps, GridRowsProp } from '@mui/x-data-grid';


interface CustomDataTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
  pageSizeOptions?: number[];
  autoHeight?: boolean;
  // getRowClassName?: (params: unknown) => string;
  customStyles?: Record<string, React.CSSProperties>;
}

export const CustomDataTable: React.FC<CustomDataTableProps> = ({
  rows,
  columns,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  customStyles
}) => {

  const dataGridProps: DataGridProps = {
    rows,
    columns,
    pagination: true,
    pageSizeOptions,
    autoHeight : true,
    initialState: {
      pagination: {
        paginationModel: { pageSize, page: 0 },
      },
    },
    disableColumnMenu: true,
    disableColumnSorting: true,
    localeText: {
      MuiTablePagination: {
        labelRowsPerPage: '每頁筆數',
      },
    },
    sx: {
      '& .MuiDataGrid-cell': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      padding: '0px !important',
      textAlign: "center",
    },
    '& .MuiDataGrid-cell:has(+ .MuiDataGrid-cellEmpty)': {
      borderRight: 'none', // 移除最後一個有內容的 cell 右側邊框
    },
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: '2px solid rgba(224, 224, 224, 1)',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'rgba(255, 87, 51, 0.12)',
    },
    '& .MuiDataGrid-selectedRowCount': { display: 'none' },
      ...customStyles
     },
  };

  // 如果提供了getRowClassName，添加到props中
  // if (getRowClassName) {
  //   dataGridProps.getRowClassName = getRowClassName;
  // }



  return <DataGrid {...dataGridProps} />;
};