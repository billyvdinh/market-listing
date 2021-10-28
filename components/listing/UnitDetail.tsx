import { Grid, Typography } from '@mui/material'
import React from 'react'

interface Props {
  label: string
  value?: string | null
  boldLabel?: boolean
}
const UnitDetail = ({ label, value, boldLabel }: Props) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography paragraph sx={{ fontWeight: boldLabel ? 600 : 400 }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography sx={{ fontWeight: 600, textAlign: 'right' }}>{value}</Typography>
      </Grid>
    </Grid>
  )
}

export default UnitDetail
