import { Listing } from '.prisma/client'
import { Prisma } from '@prisma/client'
import { createListing } from '../../../lib/domains/listing/api'

export async function handlePostListing(userId: string, body: any): Promise<Listing> {
  const createListingPayload: Prisma.ListingCreateInput = {
    ...body,
    user: { connect: { id: userId } },
  }
  return await createListing(createListingPayload)
}
