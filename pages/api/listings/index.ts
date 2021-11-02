import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { getCustomUserDataFromSession } from '../../../lib/apiRoutes/helpers'
import { handleListListings } from '../../../lib/apiRoutes/listings/get'
import { handlePostListing } from '../../../lib/apiRoutes/listings/post'

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
      const listings = await handleListListings(userId, query)
      res.status(200).json(listings)
      break
    }

    case 'POST':
      const listing = await handlePostListing(userId, req.body)
      res.json(listing)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
