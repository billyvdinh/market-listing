import { MenuItem } from '@mui/material'
import React from 'react'
import { getOptionsFromEnum } from '../../lib/view/getPrismaEnums'
import FormikTextField from './FormikTextField'

interface Props {
  title: string
  label: string
  prismaEnum: any
}

const SelectEnumField = ({ title, label, prismaEnum }: Props) => {
  const cleanEnum = getOptionsFromEnum(prismaEnum)
  return (
    <FormikTextField title={title} label={label} select>
      {cleanEnum.map((option) => (
        <MenuItem value={option.value} key={option.displayName}>
          {option.displayName}
        </MenuItem>
      ))}
    </FormikTextField>
  )
}

export default SelectEnumField
