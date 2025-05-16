// CustomSnackbar.tsx
import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertColor, AlertProps} from '@mui/material/Alert'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface CustomSnackbarProps {
  open: boolean
  message: string
  severity?: AlertColor
  onClose: () => void
  autoHideDuration?: number
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
}

const CustomAlert = ({sx, ...props}: AlertProps) => {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      iconMapping={{
        success: <CheckCircleIcon sx={{color: 'green'}} />,
        error: <ErrorOutlineIcon sx={{color: 'red'}} />,
        warning: <span>⚠️</span>,
        info: <span>ℹ️</span>,
      }}
      sx={{
        backgroundColor: '#ffff',
        color: '#000',
        minWidth: 200,
        fontSize: '16px',
        borderRadius: '10px',
        alignItems: 'center',
        flexDirection: 'column',
        ...sx,
        '& .MuiSvgIcon-root': {
          // Icon size
          width: '40px',
          height: '40px',
        },
      }}
      {...props}
    />
  )
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 2000,
  vertical = 'top',
  horizontal = 'center',
}) => {
  return (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      key={vertical + horizontal}
      sx={{
        width: '320px',
      }}>
      <CustomAlert
        severity={severity}
        sx={{
          width: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10px',
            height: '4px',
            width: '40%',
            backgroundColor: '#1976d2',
            borderRadius: '50px',
            '& MuiAlert-message': {
              paddingBottom: '30px',
            },
          },
        }}>
        {message}
      </CustomAlert>
    </Snackbar>
  )
}

export default CustomSnackbar
