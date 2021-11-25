import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import * as yup from 'yup'
import { useCreateListing, ViewListingCreateInput } from '../../lib/apiClient'
import { changeFormikValuesToListingPayload } from '../../lib/view/helpers'
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

export interface ListingFormikValues {
  title: string
  minQuantity: number
  priceInDollarsPerUnit: number | string
  description: string
  maxQuantity: number
  locationOfItems: string
  shippingOptions: string
  dimensions: string
  condition: string
  category: string
  material: string
  color: string
}

const CreateListingForm = () => {
  const { createListing } = useCreateListing()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const submitData = async (createListingPayload: ViewListingCreateInput) => {
    try {
      await createListing(createListingPayload)
      router.push('/dashboard')
      enqueueSnackbar('New listing successfully posted!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('New listing failed to post. Try again.', { variant: 'error' })
    }
  }

  return (
    <Formik
      initialValues={{
        title: '',
        minQuantity: 1,
        priceInDollarsPerUnit: 0.01,
        description: '',
        maxQuantity: 1,
        locationOfItems: '',
        shippingOptions: '',
        dimensions: '',
        condition: 'ACCEPTABLE',
        category: 'OTHER',
        material: '',
        color: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const createListingPayload = changeFormikValuesToListingPayload(values)
        await submitData(createListingPayload)
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
                Create
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

export default CreateListingForm
