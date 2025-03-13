// theme.ts
import { createTheme, ThemeProvider,CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

 const theme = createTheme({
  // spacing: 4 // 全局設定間距 預設8px,
  palette: {
    primary: {
      main: "#FF5733",
    },
    secondary: {
      main: "#E0C2FF",
      contrastText: "#47008F",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#D84315", // 全局設定 primary hover 顏色
          },
          "&.MuiButton-containedSecondary:hover": {
            backgroundColor: "#A772FF", // 全局設定 secondary hover 顏色
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderWidth: "3px", // 覆蓋原先的 1px 設定
          },
        },
        {
          props: { variant: "dashed" }, // `dashed` 是自定義 variant
          style: {
            textTransform: "none",
            border: `2px dashed ${blue[500]}`,
          },
        },
      ],
    },
  },
  typography: {
    h1: {
      fontSize: "24px", // 設定 h1 字體大小
    },
  },
});

export const MaterialWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    {/* <CssBaseline /> */}
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
