import { Listing, Prisma } from '.prisma/client'
import { prisma } from '../prisma'

const validateUserOwnsListing = async (userId: string, listingId: string): Promise<boolean> => {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { user: true },
  })
  if (listing?.user.id === userId) {
    return true
  } else throw new Error('User is unauthorized to access this listing')
}

export const validateListingIsActive = async (listingId: string | undefined) => {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  })
  if (!listing?.discardedAt) {
    // TODO: && (listing?.published)
    return true
  } else throw new Error('Listing is inactive')
}

export const createListing = async (createListingPayload: Prisma.ListingCreateInput) => {
  const result = await prisma.listing.create({
    data: createListingPayload,
  })
  return result
}

// TODO update to getPublicListing
export const getListing = async (listingId: string): Promise<Listing | null> => {
  const listing = await prisma.listing.findUnique({ where: { id: listingId } })
  if (listing?.discardedAt) return null
  // if (!listing?.published) return null
  return listing
}

export const getMyListing = async (userId: string, listingId: string): Promise<Listing | null> => {
  await validateUserOwnsListing(userId, listingId)
  const listing = await prisma.listing.findUnique({ where: { id: listingId } })
  return listing
}

export const listListings = async (): Promise<Listing[]> => {
  const listings = await prisma.listing.findMany({
    where: { discardedAt: null },
  })
  return listings
}

export const listMyListings = async (userId: string): Promise<Listing[]> => {
  const listings = await prisma.listing.findMany({
    where: { user: { id: userId }, discardedAt: null },
  })
  return listings
}

export const deleteListing = async (userId: string, listingId: string): Promise<string> => {
  await validateUserOwnsListing(userId, listingId)
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      discardedAt: new Date(),
    },
  })
  return listingId
}

export const updateListing = async (
  userId: string,
  listingId: string,
  updateListingPayload: Prisma.ListingUpdateInput,
): Promise<Listing> => {
  await validateUserOwnsListing(userId, listingId)
  const listing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: updateListingPayload,
  })
  return listing
}
