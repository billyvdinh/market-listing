import { ArrowBack, LocationOn } from '@mui/icons-material'
import { Button, Chip, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import ErrorHanlder from '../../components/common/ErrorHandler'
import Loader from '../../components/common/Loader'
import SectionContainer from '../../components/common/SectionContainer'
import DeleteListingButton from '../../components/dashboard/DeleteListingButton'
import EditListingButton from '../../components/dashboard/EditListingButton'
import BuyListingBox from '../../components/listing/order/OrderListingBox'
import UnitDetail from '../../components/listing/UnitDetail'
import { useListing } from '../../lib/apiClient'
import { getFriendlyEnumValue } from '../../lib/view/getPrismaEnums'
import {
  getFriendlyMaxQuantity,
  getFriendlyMinQuantity,
  getFriendlyPriceLabel,
} from '../../lib/view/helpers'
import placeholder from '../../public/placeholderImage.png'

const Listing: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { listing, isLoading, isError } = useListing(id)
  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />

  if (listing) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Button variant="text" onClick={router.back} startIcon={<ArrowBack />}>
              Back
            </Button>
          </Grid>
          <Grid item>
            <DeleteListingButton listing={listing} />
            <EditListingButton listing={listing} />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box>
              <Image src={placeholder} alt="placeholder" />
            </Box>

            <SectionContainer title="Description">
              <Typography>{listing.description}</Typography>
            </SectionContainer>

            <SectionContainer title="Each unit">
              <Grid container>
                <UnitDetail label="Condition" value={getFriendlyEnumValue(listing.condition)} />

                {listing.material && <UnitDetail label="Material" value={listing.material} />}

                {listing.color && <UnitDetail label="Color" value={listing.color} />}

                {listing.dimensions && <UnitDetail label="Dimensions" value={listing.dimensions} />}
              </Grid>
            </SectionContainer>

            <SectionContainer title="Shipping">
              <Typography paragraph>{listing.shippingOptions}</Typography>
              <Typography paragraph>Item Location:</Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ color: 'grey.400' }} /> {listing.locationOfItems}
              </Typography>
            </SectionContainer>
          </Grid>
          <Grid item xs={6}>
            <Chip label={getFriendlyEnumValue(listing.category)} color="primary" />
            <Typography variant="h3" sx={{ pb: 4, pt: 4 }}>
              {listing.title}
            </Typography>
            <Typography variant="h6" paragraph>
              {getFriendlyPriceLabel(listing.priceInCentsPerUnit)}
            </Typography>
            <Typography variant="h6" paragraph>
              {getFriendlyMaxQuantity(listing.maxQuantity)}
            </Typography>
            {listing.minQuantity && (
              <Typography variant="h6" paragraph>
                {getFriendlyMinQuantity(listing.minQuantity)}
              </Typography>
            )}

            <BuyListingBox listing={listing} />
          </Grid>
        </Grid>
      </Container>
    )
  }
  return <ErrorHanlder error={new Error('This resource does not exist!')} />
}

export default Listing
