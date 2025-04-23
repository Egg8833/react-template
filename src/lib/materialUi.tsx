// theme.ts
import {createTheme, ThemeProvider, CssBaseline} from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#487CB4",
    },
    secondary: {
      main: "#129B03",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F24141",
    },
    info: {
      main: "#B9B9B9",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // root: {
        //   "&:hover": {
        //     backgroundColor: "#3a6996",
        //   },
        //   "&.MuiButton-containedSecondary:hover": {
        //     backgroundColor: "#0f7f02",
        //   },
        // },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderWidth: "3px",
          },
        },
        {
          props: { variant: "dashed" },
          style: {
            textTransform: "none",
            border: `2px dashed #487CB4`,
          },
        },
      ],
    },

    // 保持 Input / Select focus 後不變色
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ced4da", // 預設灰色，或你可以改為固定色
          },
        },
        notchedOutline: {
          borderColor: "#ced4da", // 預設邊框色
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        outlined: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ced4da",
          },
        },
      },
    },
  },
   typography: {
    h1: {
      fontSize: "24px", // 設定 h1 字體大小
    },
  }
});


export const MaterialWrapper = ({children}: {children: React.ReactNode}) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
)
