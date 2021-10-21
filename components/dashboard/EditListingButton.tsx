import { Listing } from '.prisma/client'
import { Button } from '@mui/material'
import React from 'react'
import useIsMyListing from '../../lib/hooks/useIsMyListing'
import { NextLinkComposed } from '../common/Link'

interface Props {
  listing: Listing
}

const EditListingButton = ({ listing }: Props) => {
  const isMyListing = useIsMyListing()
  if (isMyListing(listing.userId)) {
    return (
      <Button
        component={NextLinkComposed}
        to={`/listing/edit/${listing.id}`}
        size="small"
        variant="text"
      >
        Edit Listing
      </Button>
    )
  }
  return <></>
}

export default EditListingButton
