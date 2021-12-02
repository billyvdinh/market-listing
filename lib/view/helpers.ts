import { DateTime } from 'luxon'
import { ListingFormikValues } from '../../components/listing/CreateListingForm'

// TODO replace these with the commission prop from the prisma Listing model
const circularIncentivePercentage = 0.1
const serviceFeePercentage = 0.1

export const convertDollarsToCents = (dollars: number | string) => {
  if (typeof dollars === 'number') {
    return dollars * 100
  } else return parseFloat(dollars) * 100
}

export const convertCentsToDollars = (cents: number) => {
  const dollars = cents / 100
  return dollars.toFixed(2)
}

export const addCommasToNumber = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getFriendlyPriceLabel = (cents: number) => {
  return `$${addCommasToNumber(convertCentsToDollars(cents))}/unit`
}

export const getPriceForXUnits = (priceInCentsPerUnit: number, numberOfUnits: number) => {
  return addCommasToNumber(convertCentsToDollars(priceInCentsPerUnit * numberOfUnits))
}

export const getServiceFee = (priceInCentsPerUnit: number, numberOfUnits: number) => {
  const price = addCommasToNumber(
    convertCentsToDollars(priceInCentsPerUnit * numberOfUnits * serviceFeePercentage),
  )
  return price
}

export const getCircularIncentive = (priceInCentsPerUnit: number, numberOfUnits: number) => {
  const price = addCommasToNumber(
    convertCentsToDollars(priceInCentsPerUnit * numberOfUnits * circularIncentivePercentage),
  )
  return price
}

export const getTotal = (priceInCentsPerUnit: number, numberOfUnits: number) => {
  const subtotal = priceInCentsPerUnit * numberOfUnits
  const incentiveFee = subtotal * circularIncentivePercentage
  const serviceFee = subtotal * serviceFeePercentage
  const price = addCommasToNumber(convertCentsToDollars(subtotal + incentiveFee + serviceFee))

  return price
}

export const getFriendlyMaxQuantity = (maxQuantity: number) => {
  return `${addCommasToNumber(maxQuantity)} unit${maxQuantity > 1 ? 's' : ''} available`
}

export const getFriendlyMinQuantity = (minQuantity: number) => {
  return `${addCommasToNumber(minQuantity)} min. purchase quantity`
}

export const getFriendlyDate = (date: Date) => {
  return DateTime.fromISO(date.toString()).toLocaleString()
}

export const changeFormikValuesToListingPayload = (values: ListingFormikValues) => {
  const valuesWithPriceInCents = {
    ...values,
    priceInCentsPerUnit: convertDollarsToCents(values.priceInDollarsPerUnit),
  }
  const { priceInDollarsPerUnit, ...listingPayload } = valuesWithPriceInCents

  return listingPayload
}
