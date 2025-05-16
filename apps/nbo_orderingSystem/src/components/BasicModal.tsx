import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'

const getModalStyle = (ModalWidth: number = 400) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ModalWidth,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
})

const closeIconStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  cursor: 'pointer',
  padding: 1,
  fontSize: 32,
  color: 'text.secondary',
}

interface BasicModalProps {
  propsOpen: boolean
  setOpen: (open: boolean) => void
  title: string
  children?: React.ReactNode
  triggerType?: 'button' | 'text' | 'none'
  ModalWidth?: number
}

const BasicModal: React.FC<BasicModalProps> = ({
  propsOpen,
  setOpen,
  title,
  children,
  triggerType = 'button',
  ModalWidth ,
}) => {
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/* 依據 triggerType 顯示不同的開啟方式 */}
      {triggerType === 'button' && (
        <Button variant="outlined" onClick={handleOpen}>
          開啟 Modal (子組件)
        </Button>
      )}
      {triggerType === 'text' && (
        <span
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          onClick={handleOpen}>
          開啟 Modal (子組件)
        </span>
      )}

      <Modal
        open={propsOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-content">
        <Box sx={getModalStyle(ModalWidth)}>
          <CloseIcon onClick={handleClose} sx={closeIconStyle} />
          <Typography id="modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
            {title}
          </Typography>
          <Box id="modal-content">{children}</Box>
        </Box>
      </Modal>
    </div>
  )
}

export default BasicModal
