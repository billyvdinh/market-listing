import { IconProps, InputAdornment, TextField } from '@mui/material'
import { FormikProps, FormikValues, useFormikContext } from 'formik'
import React from 'react'

interface Props {
  title: string
  label: string
  type?: string
  maxRows?: number
  minRows?: number
  rows?: number
  startAdornment?: string | IconProps
  endAdornment?: string | IconProps
  placeholder?: string
  select?: boolean
  children?: React.ReactNode
  customHandleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const FormikTextField = ({
  title,
  label,
  type,
  maxRows,
  minRows,
  rows,
  startAdornment,
  endAdornment,
  customHandleBlur,
  placeholder,
  select,
  children,
}: Props) => {
  const formik: FormikProps<FormikValues> = useFormikContext()

  return (
    <TextField
      margin={'normal'}
      fullWidth
      select={select}
      variant="outlined"
      label={label}
      type={type || 'text'}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null,
      }}
      multiline={Boolean(rows)}
      maxRows={!rows ? maxRows || '' : ''}
      minRows={!rows ? minRows || '' : ''}
      id={title}
      name={title}
      rows={rows || ''}
      placeholder={placeholder || ''}
      value={formik.values[title]}
      onChange={formik.handleChange}
      error={formik.touched[title] && Boolean(formik.errors[title])}
      helperText={formik.touched[title] && formik.errors[title]}
      onBlur={customHandleBlur || formik.handleBlur}
    >
      {children}
    </TextField>
  )
}

export default FormikTextField
