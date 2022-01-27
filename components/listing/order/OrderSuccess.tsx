import { Button, Typography } from '@mui/material'
import React from 'react'

interface Props {
  handleClose: () => void
}

const OrderSuccess = ({ handleClose }: Props) => {
  return (
    <>
      <Typography variant="h4" sx={{ pt: 2 }}>
        Congrats!
      </Typography>
      <Typography variant="h4">Your order has been placed.</Typography>
      <Typography color="GrayText" sx={{ pb: 3, pt: 1 }}>
        We have notified the seller, and they will reach out to you directly. Please note that your
        purchase is pending until approved by the seller.
      </Typography>
      <Button variant="outlined" size="large" color="info" onClick={handleClose}>
        Close
      </Button>
    </>
  )
}

export default OrderSuccess
