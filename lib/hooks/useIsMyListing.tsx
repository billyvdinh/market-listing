import { useUser } from '@auth0/nextjs-auth0'

const useIsMyListing = () => {
  const { user, isLoading } = useUser()
  const isMyListing = (listingUserId: string) => {
    if (isLoading || !user) {
      return false
    }
    return user.userId === listingUserId
  }
  return isMyListing
}

export default useIsMyListing
