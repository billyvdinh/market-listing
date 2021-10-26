import { Listing } from '.prisma/client'
import { Grid, Typography } from '@mui/material'
import ListingCard from './ListingCard'

interface Props {
  listings: Listing[] | undefined
  myListing?: boolean
  listTitle?: string
}

export default function ListingList({ listings, myListing = false, listTitle }: Props) {
  return (
    <>
      {listTitle && (
        <Grid container sx={{ borderTop: '1px solid black', pt: 2, mb: 4 }}>
          <Grid item xs={12}>
            <Typography variant="h4">{listTitle}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2}>
        {listings &&
          listings.map((listing) => (
            <Grid item key={listing.id}>
              <ListingCard key={listing.id} listing={listing} />
            </Grid>
          ))}
      </Grid>
    </>
  )
}
