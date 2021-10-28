import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ErrorHanlder from '../components/common/ErrorHandler'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/Listings'
import { useListings } from '../lib/apiClient'

const Home: NextPage = () => {
  const { listings, isLoading, isError } = useListings()
  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />

  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        Recycled industrial products for a better future
      </Typography>
      <ListingList
        listings={listings}
        listTitle={listings ? `${listings.length} listings` : 'No listings'}
      />
    </Box>
  )
}

export default Home
