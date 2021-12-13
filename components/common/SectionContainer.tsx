import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface Props {
  children: React.ReactNode
  title: string
  id: string
}

const SectionContainer = ({ children, title, id }: Props) => {
  return (
    <Box sx={{ pt: 2, mt: 4, borderTop: '1px solid black' }}>
      <Typography id={id} variant="h4" sx={{ mb: 4 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default SectionContainer
