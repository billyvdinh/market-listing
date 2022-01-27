import { Prisma } from '@prisma/client'
import { getListing } from '../listing/api'
import { prisma } from '../prisma'

const validatePurchaseQuantity = async (
  quantity: number,
  minQuantity: number | null,
  maxQuantity: number,
) => {
  if (quantity > maxQuantity) {
    throw new Error('Invalid order')
  }
  if (minQuantity && quantity < minQuantity) {
    throw new Error('Invalid order')
  }
  return true
}

export const createOrder = async (createOrderPayload: Prisma.OrderCreateInput) => {
  const { quantity } = createOrderPayload
  const listingId = createOrderPayload.listing.connect?.id
  if (!listingId) throw new Error('Invalid order')
  const listing = await getListing(listingId) // TODO update to getPublicListing
  if (!listing) throw new Error('Invalid order')
  await validatePurchaseQuantity(quantity, listing?.minQuantity, listing?.maxQuantity)
  const order = await prisma.order.create({
    data: createOrderPayload,
  })

  // async sendNewOrderEmails(order) ==> sends to Matt, seller, buyer
  return order
}
