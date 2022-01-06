import { Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import StyledList from '../components/common/ListSelector'
import CreateListingForm from '../components/listing/CreateListingForm'

const Dashboard: NextPage = () => {
  const items = [
    { title: 'The Batch', id: 'id-the-batch' },
    { title: 'Price and quantity', id: 'id-price-and-quantity' },
    { title: 'Shipping', id: 'id-shipping' },
    { title: ' About each unit', id: 'id-about-each-unit' },
  ]

  return (
    <Container>
      <Grid container sx={{ mt: 6 }}>
        <Grid item xs={12}>
          <Typography variant="h3">Create New Listing</Typography>
        </Grid>

        <Grid item xs={3} sx={{ mt: 2 }}>
          <StyledList items={items} />
        </Grid>

        <Grid item xs={8} sx={{ ml: 'auto' }}>
          <CreateListingForm />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
