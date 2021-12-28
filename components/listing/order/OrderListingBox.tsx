import { Listing } from '.prisma/client'
import { Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import {
  getCircularIncentive,
  getFriendlyPriceLabel,
  getPriceForXUnits,
  getServiceFee,
  getTotal,
} from '../../../lib/view/helpers'
import FormikTextField from '../FormikTextField'
import OrderSummaryDialog from './OrderSummaryDialog'

interface Props {
  listing: Listing
}

const validationSchema = yup.object({
  maxQuantity: yup.number(),
  minQuantity: yup.number(),
  desiredQuantity: yup
    .number()
    .required('Available quantity is required')
    .positive()
    .integer()
    .min(yup.ref('minQuantity'))
    .max(yup.ref('maxQuantity')),
})

const BuyListingBox = ({ listing }: Props) => {
  const [summaryOpen, setSummaryOpen] = useState(false)
  return (
    <Paper sx={{ p: 4 }} elevation={4}>
      <Typography variant="h4" sx={{ pb: 4 }}>
        Calculate your price
      </Typography>

      <Formik
        initialValues={{
          maxQuantity: listing.maxQuantity,
          minQuantity: listing.minQuantity || 0,
          desiredQuantity: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={() => setSummaryOpen(true)}
      >
        {(formik) => {
          const subtotal = getPriceForXUnits(
            listing.priceInCentsPerUnit,
            formik.values.desiredQuantity,
          )
          const serviceFee = getServiceFee(
            listing.priceInCentsPerUnit,
            formik.values.desiredQuantity,
          )
          const circularIncentive = getCircularIncentive(
            listing.priceInCentsPerUnit,
            formik.values.desiredQuantity,
          )
          const total = getTotal(listing.priceInCentsPerUnit, formik.values.desiredQuantity)

          return (
            <>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  wrap="nowrap"
                >
                  <Grid item>
                    <Grid container alignItems="center" spacing={2} wrap="nowrap">
                      <Grid item>
                        <FormikTextField
                          title="desiredQuantity"
                          label="Desired Quantity"
                          type="number"
                        />
                      </Grid>
                      <Grid item>
                        <Typography>
                          x {getFriendlyPriceLabel(listing.priceInCentsPerUnit)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography align="right" sx={{ fontWeight: 600 }}>
                      ${subtotal}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  wrap="nowrap"
                  sx={{ mb: 1 }}
                >
                  <Grid item>
                    <Typography>Service fee</Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="right" sx={{ fontWeight: 600 }}>
                      ${serviceFee}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  wrap="nowrap"
                  sx={{ mb: 2 }}
                >
                  <Grid item>
                    <Typography>Circular Incentive</Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="right" sx={{ fontWeight: 600 }}>
                      ${circularIncentive}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider color="black" />

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  wrap="nowrap"
                  sx={{ mt: 2, mb: 4 }}
                >
                  <Grid item>
                    <Typography>Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="right" sx={{ fontWeight: 600 }}>
                      ${total}
                    </Typography>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  size="large"
                  color="info"
                  fullWidth
                  type="submit"
                  disabled={Boolean(formik.errors.desiredQuantity)}
                >
                  Place Order
                </Button>
              </form>
              <OrderSummaryDialog
                open={summaryOpen}
                handleClose={() => setSummaryOpen(false)}
                desiredQuantity={formik.values.desiredQuantity}
                subtotal={subtotal}
                serviceFee={serviceFee}
                circularIncentive={circularIncentive}
                total={total}
                listing={listing}
              />
            </>
          )
        }}
      </Formik>
    </Paper>
  )
}

export default BuyListingBox
