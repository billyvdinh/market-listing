import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <Box m={20}>
        <Typography variant="h4">
          What if you could make more money by making less stuff?
        </Typography>
      </Box>
    </>
  )
}

export default Home
