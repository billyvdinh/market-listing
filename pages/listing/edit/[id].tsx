import { ArrowBack } from '@mui/icons-material'
import { Button, Container, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import ErrorHanlder from '../../../components/common/ErrorHandler'
import StyledList from '../../../components/common/ListSelector'
import Loader from '../../../components/common/Loader'
import EditListingForm from '../../../components/listing/EditListingForm'
import { useMyListing } from '../../../lib/apiClient'

const EditListing: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { listing, isLoading, isError } = useMyListing(id)

  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />

  if (listing) {
    const items = [
      { title: 'The Batch', id: 'id-the-batch' },
      { title: 'Price and quantity', id: 'id-price-and-quantity' },
      { title: 'Shipping', id: 'id-shipping' },
      { title: ' About each unit', id: 'id-about-each-unit' },
    ]

    return (
      <Container sx={{ py: 4 }}>
        <Button variant="text" onClick={router.back} startIcon={<ArrowBack />}>
          Back
        </Button>
        <Grid item xs={3} sx={{ mt: 2 }}>
          <StyledList items={items} />
        </Grid>

        <Grid item xs={8} sx={{ ml: 'auto' }}>
          <EditListingForm listing={listing} />
        </Grid>
      </Container>
    )
  }
  return <ErrorHanlder error={new Error('This resource does not exist!')} />
}

export default EditListing
