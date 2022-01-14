import { Category } from '.prisma/client'
import React from 'react'
import SectionContainer from '../../common/SectionContainer'
import FormikTextField from '../FormikTextField'
import SelectEnumField from '../SelectEnumField'

const BatchDetails = () => {
  return (
    <SectionContainer title="The batch" id="id-the-batch">
      <FormikTextField label="Title" title="title" />

      <SelectEnumField title="category" label="Category" prismaEnum={Category} />

      <FormikTextField title="description" label="Description" rows={8} />
    </SectionContainer>
  )
}

export default BatchDetails
