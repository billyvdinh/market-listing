import { Listing } from '.prisma/client'
import {
  getListing,
  getMyListing,
  listListings,
  listMyListings,
} from '../../../lib/domains/listing/api'

export async function handleListListings(
  userId: string,
  query: {
    [key: string]: string | string[]
  },
): Promise<Listing[]> {
  let listings: Listing[]
  if (query.myListings) {
    listings = await listMyListings(userId)
  } else {
    listings = await listListings()
  }
  return listings
}

export async function handleGetListing(
  userId: string,
  query: {
    [key: string]: string | string[]
  },
): Promise<Listing | null> {
  const listingId = query.id

  let listing: Listing | null

  if (typeof listingId === 'string') {
    if (query.myListing) {
      listing = await getMyListing(userId, listingId)
    } else {
      listing = await getListing(listingId)
    }
    return listing
  } else throw new Error(`Invalid query parameter 'listingId': ${listingId}. Expected string`)
}
