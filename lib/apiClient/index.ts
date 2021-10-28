import { Listing, Order, Prisma } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { creater, deleter, fetcher, updater } from './helpers'

// TODO consider breaking this up into domains once there are more

export interface ViewListingCreateInput
  extends Omit<Prisma.ListingCreateInput, 'user' | 'condition' | 'category'> {
  category: string
  condition: string
}

export interface ViewListingUpdateInput
  extends Omit<Prisma.ListingUpdateInput, 'user' | 'condition' | 'category'> {
  category: string
  condition: string
}

export interface ViewOrderCreateInput extends Omit<Prisma.OrderCreateInput, 'user' | 'listing'> {
  listingId: string
}

export function useListing(id: string | string[] | undefined) {
  const { data, error } = useSWR<Listing, Error>(id ? `/api/listings/${id}` : null, fetcher)
  return {
    listing: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMyListing(id: string | string[] | undefined) {
  const { data, error } = useSWR<Listing, Error>(
    id ? `/api/listings/${id}?myListing=true` : null,
    fetcher,
  )
  return {
    listing: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings`, fetcher)
  return {
    listings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMyListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings?myListings=true`, fetcher)
  return {
    myListings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCreateOrder() {
  const { mutate } = useSWRConfig()
  const createOrder = async (createOrderPayload: ViewOrderCreateInput): Promise<Order> => {
    const response = await creater<Order>('/api/orders/', createOrderPayload)
    mutate(`/api/orders`)
    return response
  }
  return { createOrder }
}

export function useCreateListing() {
  const { mutate } = useSWRConfig()
  const createListing = async (createListingPayload: ViewListingCreateInput): Promise<Listing> => {
    const response = await creater<Listing>('/api/listings/', createListingPayload)
    mutate(`/api/listings`)
    mutate(`/api/listings?myListings=true`)
    return response
  }
  return { createListing }
}

export function useUpdateListing() {
  const { mutate } = useSWRConfig()
  const updateListing = async (
    id: string | string[] | undefined,
    updateListingPayload: ViewListingUpdateInput,
  ): Promise<Listing> => {
    const response = await updater<Listing>(`/api/listings/${id}`, updateListingPayload)
    mutate(`/api/listings/${id}`)
    mutate(`/api/listings/${id}?myListing=true`)
    mutate(`/api/listings?myListings=true`)
    return response
  }
  return { updateListing }
}

export function useDeleteListing() {
  const { mutate } = useSWRConfig()
  const deleteListing = async (id: string): Promise<string> => {
    const response = await deleter(`/api/listings/${id}`)
    mutate(`/api/listings/${id}`)
    mutate(`/api/listings`)
    mutate(`/api/listings?myListings=true`)
    return response
  }
  return { deleteListing }
}
