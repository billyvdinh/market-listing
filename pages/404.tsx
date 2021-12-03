import { Box, Typography } from '@mui/material'

export default function Custom404() {
  // TODO customize
  return (
    <Box py={10} display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      <Typography variant="h6">{'Uh oh! This page does not exist :('}</Typography>
    </Box>
  )
}
