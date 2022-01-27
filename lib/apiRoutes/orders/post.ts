import { Order } from '.prisma/client'
import { Prisma } from '@prisma/client'
import { createOrder } from '../../../lib/domains/order/api'
import { ViewOrderCreateInput } from '../../apiClient'

export async function handlePostOrder(userId: string, body: ViewOrderCreateInput): Promise<Order> {
  const createOrderPayload: Prisma.OrderCreateInput = {
    quantity: body.quantity,
    listing: { connect: { id: body.listingId } },
    user: { connect: { id: userId } },
  }
  return await createOrder(createOrderPayload)
}
