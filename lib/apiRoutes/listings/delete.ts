import { deleteListing } from '../../domains/listing/api'

export async function handleDeleteListing(
  userId: string,
  query: {
    [key: string]: string | string[]
  },
): Promise<string> {
  const listingId = query.id
  if (typeof(listingId) === 'string') {
    return await deleteListing(userId, listingId)
  } else throw new Error(`Invalid query parameter 'listingId': ${listingId}. Expected string`)
}
