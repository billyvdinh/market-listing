import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import AuthButton from './AuthButton'

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Market Listing
          </Typography>
          <AuthButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
