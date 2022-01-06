import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { getCustomUserDataFromSession } from '../../../lib/apiRoutes/helpers'
import { handlePostOrder } from '../../../lib/apiRoutes/orders/post'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  // Assumption: all endpoints are protected!
  if (!session) {
    res.status(401).end
    return
  }
  const { userId } = getCustomUserDataFromSession(session)
  const { method } = req
  switch (method) {
    case 'POST':
      const listing = await handlePostOrder(userId, req.body)
      res.json(listing)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
