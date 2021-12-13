import { Listing } from '.prisma/client'
import { Button, Checkbox, Dialog, Divider, FormControlLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useCreateOrder, ViewOrderCreateInput } from '../../../lib/apiClient'
import { addCommasToNumber, getFriendlyPriceLabel } from '../../../lib/view/helpers'
import UnitDetail from '../UnitDetail'
import OrderSuccess from './OrderSuccess'

interface Props {
  open: boolean
  handleClose: () => void
  subtotal: string
  desiredQuantity: number
  serviceFee: string
  circularIncentive: string
  total: string
  listing: Listing
}

const OrderSummaryDialog = ({
  open,
  handleClose,
  subtotal,
  desiredQuantity,
  serviceFee,
  circularIncentive,
  total,
  listing,
}: Props) => {
  const [termsAreChecked, setTermsAreChecked] = useState(false)
  const { createOrder } = useCreateOrder()
  const { enqueueSnackbar } = useSnackbar()
  const [orderSucceeded, setOrderSucceeded] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // reset if you open again after submitting an order
  useEffect(() => {
    if (open) {
      setTermsAreChecked(false)
      setOrderSucceeded(false)
      setSubmitting(false)
    }
  }, [open])

  const submitOrder = async (createOrderPayload: ViewOrderCreateInput) => {
    try {
      setSubmitting(true)
      await createOrder(createOrderPayload)
      setSubmitting(false)
      setOrderSucceeded(true)
    } catch (error) {
      setSubmitting(false)
      enqueueSnackbar('Order submission failed. Try again or contact support.', {
        variant: 'error',
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { p: 6 } }}>
      <Box sx={{ minWidth: { xs: 300, md: 400 } }}>
        {orderSucceeded ? (
          <OrderSuccess handleClose={handleClose} />
        ) : (
          <>
            <Typography variant="h4" sx={{ py: 2 }}>
              Order summary
            </Typography>
            <UnitDetail label="Product" value={listing.title} />
            <UnitDetail label="Desired Quantity" value={addCommasToNumber(desiredQuantity)} />
            <Divider color="black" sx={{ mb: 2 }} />
            <UnitDetail
              label={`Units (${getFriendlyPriceLabel(listing.priceInCentsPerUnit)})`}
              value={`$${subtotal}`}
            />
            <UnitDetail label="Service fee" value={`$${serviceFee}`} />
            <UnitDetail label="Circular incentive" value={`$${circularIncentive}`} />
            <Divider color="black" sx={{ mb: 2 }} />
            <UnitDetail label="Total" value={`$${total}`} boldLabel />

            <FormControlLabel
              control={
                <Checkbox
                  value={termsAreChecked}
                  onChange={(e) => setTermsAreChecked(e.target.checked)}
                />
              }
              label="Upon confirming the seller will receive an email. They will follow up with your
                  directly. Your purchase is pending until they approve it."
              sx={{ '& .MuiFormControlLabel-label': { fontSize: 12, color: 'grey.600' } }}
            ></FormControlLabel>

            <Button
              variant="contained"
              size="large"
              color="info"
              disabled={!termsAreChecked || submitting}
              fullWidth
              sx={{ mt: 4 }}
              onClick={() => submitOrder({ listingId: listing.id, quantity: desiredQuantity })}
            >
              {submitting ? 'Placing order...' : 'Place Order'}
            </Button>

            <Box textAlign="center" mt={3}>
              <Button
                variant="text"
                size="small"
                color="info"
                sx={{ textTransform: 'none' }}
                onClick={handleClose}
              >
                Cancel Order
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  )
}

export default OrderSummaryDialog
