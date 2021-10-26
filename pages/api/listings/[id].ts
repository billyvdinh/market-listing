import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { getCustomUserDataFromSession } from '../../../lib/apiRoutes/helpers'
import { handleDeleteListing } from '../../../lib/apiRoutes/listings/delete'
import { handleGetListing } from '../../../lib/apiRoutes/listings/get'
import { handleUpdateListing } from '../../../lib/apiRoutes/listings/put'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  // Assumption: all endpoints are protected!
  if (!session) {
    res.status(401).end
    return
  }
  const { userId } = getCustomUserDataFromSession(session)
  const { method, query } = req
  switch (method) {
    case 'GET': {
      const listing = await handleGetListing(userId, query)
      listing ? res.status(200).json(listing) : res.status(404).end('Resource not found')
      break
    }

    case 'PUT': {
      const listing = await handleUpdateListing(userId, query, req.body)
      listing ? res.status(200).json(listing) : res.status(404).end('Resource not found')
      break
    }

    case 'DELETE':
      const listingId = await handleDeleteListing(userId, query)
      res.json(JSON.stringify(listingId))
      break

    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
