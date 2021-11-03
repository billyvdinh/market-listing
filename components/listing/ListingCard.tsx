import { Listing } from '.prisma/client'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import useIsMyListing from '../../lib/hooks/useIsMyListing'
import {
  getFriendlyDate,
  getFriendlyMaxQuantity,
  getFriendlyMinQuantity,
  getFriendlyPriceLabel,
} from '../../lib/view/helpers'
import { NextLinkComposed } from '../common/Link'
import EditListingButton from '../dashboard/EditListingButton'

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  const isMyListing = useIsMyListing()

  return (
    <Card sx={{ maxWidth: 360 }}>
      <Link href={`/listing/${listing.id}`} passHref>
        <CardActionArea>
          <CardHeader
            title={listing.title}
            titleTypographyProps={{ sx: { fontSize: 16, fontWeight: 500 } }}
          />
          <CardMedia
            component="img"
            alt="placeholder image"
            height="194"
            image="/placeholderImage.png"
          />
          <CardContent>
            <Typography variant="body2">Posted on {getFriendlyDate(listing.createdAt)}</Typography>
            <Typography variant="body2">
              {getFriendlyPriceLabel(listing.priceInCentsPerUnit)}
            </Typography>
            <Typography variant="body2">{getFriendlyMaxQuantity(listing.maxQuantity)}</Typography>
            {listing.minQuantity && (
              <Typography variant="body2">{getFriendlyMinQuantity(listing.minQuantity)}</Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            component={NextLinkComposed}
            to={`/listing/${listing.id}`}
            size="small"
            variant="text"
          >
            View Listing
          </Button>
          <EditListingButton listing={listing} />
        </Box>
        <Button
          size="small"
          variant="text"
          sx={{ color: 'black', '&:hover': { bgcolor: 'unset', cursor: 'default' } }}
          disableRipple
        >
          {getFriendlyPriceLabel(listing.priceInCentsPerUnit)}
        </Button>
      </CardActions>
    </Card>
  )
}
