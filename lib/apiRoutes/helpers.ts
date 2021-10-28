import { User } from '.prisma/client'
import { Session } from '@auth0/nextjs-auth0'

export const getDefaultUserDataFromSession = (session: Session) => {
  return {
    authId: session.user.sub,
    email: session.user.email,
  }
}

export const getCustomUserDataFromSession = (session: Session) => {
  return { userId: session.user.userId }
}

export const attachUserIdToSession = (user: User, session: Session): Session => {
  session.user.userId = user.id
  return session
}
