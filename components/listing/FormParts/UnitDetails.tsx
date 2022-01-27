import { Condition } from '.prisma/client'
import React from 'react'
import SectionContainer from '../../common/SectionContainer'
import FormikTextField from '../FormikTextField'
import SelectEnumField from '../SelectEnumField'

const UnitDetails = () => {
  return (
    <SectionContainer title="About each unit" id="id-about-each-unit">
      <SelectEnumField label="Condition" title="condition" prismaEnum={Condition} />

      <FormikTextField label="Material" title="material" />

      <FormikTextField label="Color" title="color" />

      <FormikTextField label="Dimensions" title="dimensions" />
    </SectionContainer>
  )
}

export default UnitDetails
