import { Listing } from '.prisma/client'
import { updateListing } from '../../domains/listing/api'

export async function handleUpdateListing(
  userId: string,
  query: {
    [key: string]: string | string[]
  },
  body: any,
): Promise<Listing> {
  const listingId = query.id
  if (typeof listingId === 'string') {
    return await updateListing(userId, listingId, body)
  } else throw new Error(`Invalid query parameter 'listingId': ${listingId}. Expected string`)
}
