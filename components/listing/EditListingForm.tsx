import { Listing } from '.prisma/client'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import * as yup from 'yup'
import { useUpdateListing, ViewListingUpdateInput } from '../../lib/apiClient'
import { changeFormikValuesToListingPayload, convertCentsToDollars } from '../../lib/view/helpers'
import { NextLinkComposed } from '../common/Link'
import BatchDetails from './FormParts/BatchDetails'
import PriceAndQuantityDetails from './FormParts/PriceAndQuantityDetails'
import ShippingDetails from './FormParts/ShippingDetails'
import UnitDetails from './FormParts/UnitDetails'

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  minQuantity: yup.number().required('Minimum quantity is required').positive().integer(),
  priceInDollarsPerUnit: yup.number().required('Unit price is required').positive(),
  maxQuantity: yup.number().required('Available quantity is required').positive().integer(),
  locationOfItems: yup.string().required('Location of items is required'),
  shippingOptions: yup.string().required('Shipping options are required'),
  dimensions: yup.string(),
  condition: yup.mixed().oneOf(['BRAND_NEW', 'LIKE_NEW', 'VERY_GOOD', 'GOOD', 'ACCEPTABLE']),
  category: yup.mixed().oneOf(['BOTTLES', 'CANS', 'SPRINGS', 'SCREWS', 'BOLTS', 'OTHER']),
  material: yup.string(),
  color: yup.string(),
})

interface Props {
  listing: Listing
}

const EditListingForm = ({ listing }: Props) => {
  const { updateListing } = useUpdateListing()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const submitData = async (updateListingPayload: ViewListingUpdateInput) => {
    try {
      await updateListing(router.query.id, updateListingPayload)
      router.push('/dashboard')
      enqueueSnackbar('Listing successfully updated!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Listing failed to update. Try again.', { variant: 'error' })
    }
  }

  return (
    <Formik
      initialValues={{
        title: listing.title,
        minQuantity: listing.minQuantity || 1,
        priceInDollarsPerUnit: convertCentsToDollars(listing.priceInCentsPerUnit) || 0.01,
        description: listing.description || '',
        maxQuantity: listing.maxQuantity || 1,
        locationOfItems: listing.locationOfItems,
        shippingOptions: listing.shippingOptions,
        dimensions: listing.dimensions || '',
        condition: listing.condition || 'ACCEPTABLE',
        category: listing.category || 'OTHER',
        material: listing.material || '',
        color: listing.color || '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const updateListingPayload = changeFormikValuesToListingPayload(values)

        await submitData(updateListingPayload)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <BatchDetails />

          <PriceAndQuantityDetails />

          <ShippingDetails />

          <UnitDetails />

          <Box my={4} display="flex">
            <Box mr={2}>
              <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                Save
              </Button>
            </Box>
            <Button variant="outlined" type="submit" component={NextLinkComposed} to="/dashboard">
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default EditListingForm
