import { useUser } from '@auth0/nextjs-auth0'
import { Box, Button } from '@mui/material'
import ErrorHandler from './ErrorHandler'
import { NextLinkComposed } from './Link'
import Loader from './Loader'

const AuthButon = () => {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <Loader />
  if (error) return <ErrorHandler />

  if (user) {
    return (
      <Box>
        <Button variant="text" color="inherit" component={NextLinkComposed} to="/marketplace">
          Marketplace
        </Button>
        <Button variant="text" color="inherit" component={NextLinkComposed} to="/dashboard">
          Dashboard
        </Button>
        <Button variant="text" color="inherit" href={'/api/auth/logout'}>
          Logout
        </Button>
      </Box>
    )
  }
  return (
    <Button variant="outlined" color="inherit" href={'/api/auth/login'}>
      Login
    </Button>
  )
}

export default AuthButon
