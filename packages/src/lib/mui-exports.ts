// 僅匯出專案中實際使用的 MUI 組件
// 這樣可以進一步減少打包大小

// 常用組件
export { default as Box } from '@mui/material/Box';
export { default as Button } from '@mui/material/Button';
export { default as Typography } from '@mui/material/Typography';
export { default as Paper } from '@mui/material/Paper';
export { default as TextField } from '@mui/material/TextField';
export { default as Checkbox } from '@mui/material/Checkbox';
export { default as FormControlLabel } from '@mui/material/FormControlLabel';

// Snackbar 相關
export { default as Snackbar } from '@mui/material/Snackbar';
export { default as Alert } from '@mui/material/Alert';
export type { AlertColor, AlertProps } from '@mui/material/Alert';
export type { SnackbarOrigin } from '@mui/material/Snackbar';

// 主題相關
export { createTheme, ThemeProvider } from '@mui/material/styles';
export { default as CssBaseline } from '@mui/material/CssBaseline';
export type { SxProps, Theme } from '@mui/material/styles';

// 常用圖示
export { default as LockIcon } from '@mui/icons-material/Lock';
export { default as ExpandLess } from '@mui/icons-material/ExpandLess';
export { default as ExpandMore } from '@mui/icons-material/ExpandMore';
export { default as CheckCircleIcon } from '@mui/icons-material/CheckCircle';
export { default as CheckCircleOutlineIcon } from '@mui/icons-material/CheckCircleOutline';
export { default as ErrorOutlineIcon } from '@mui/icons-material/ErrorOutline';

// Data Grid
export type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
