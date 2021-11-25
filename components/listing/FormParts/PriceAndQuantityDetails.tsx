import { useFormikContext } from 'formik'
import React from 'react'
import SectionContainer from '../../common/SectionContainer'
import FormikTextField from '../FormikTextField'

const PriceAndQuantityDetails = () => {
  const formik = useFormikContext()

  const getDisplayPrice = (value: string) => {
    const number = value ? parseFloat(value) : 0.01
    return number.toFixed(2)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    formik.setFieldValue(fieldName, getDisplayPrice(fieldValue))
  }

  return (
    <SectionContainer title="Price and quantity" id="id-price-and-quantity">
      <FormikTextField
        label="Available Quantity"
        type="number"
        title="maxQuantity"
        endAdornment={'units'}
      />
      <FormikTextField
        label="Minimum Purchase Quantity"
        endAdornment={'units'}
        type="number"
        title="minQuantity"
      />
      <FormikTextField
        startAdornment={'$'}
        endAdornment={'/unit'}
        customHandleBlur={handlePriceChange}
        label="Unit Price"
        type="number"
        title="priceInDollarsPerUnit"
      />
    </SectionContainer>
  )
}

export default PriceAndQuantityDetails
