import { LocationOn } from '@mui/icons-material'
import React from 'react'
import SectionContainer from '../../common/SectionContainer'
import FormikTextField from '../FormikTextField'

const ShippingDetails = () => {
  return (
    <SectionContainer title="Shipping" id="id-shipping">
      <FormikTextField
        label="Location of Items"
        title="locationOfItems"
        startAdornment={<LocationOn />}
      />
      <FormikTextField
        label="Shipping Options"
        title="shippingOptions"
        rows={3}
        placeholder="Describe how you'll ship, transport, or arrange pickup for these items."
      />
    </SectionContainer>
  )
}

export default ShippingDetails
