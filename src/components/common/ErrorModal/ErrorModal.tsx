import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'

interface ErrorModalProps {
  title?:string
  open: boolean
  errorMessage: string
  onClose: () => void
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #f44336',
  boxShadow: 24,
  p: 4,
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ title, open, errorMessage, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="error-modal-title">
      <Box sx={style}>
        <Typography id="error-modal-title" variant="h6" component="h2" color="error">
          {title || 'Error'}
        </Typography>
        <Typography sx={{ mt: 2 }}>{errorMessage}</Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  )
}
