import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Loader from './Loader'

interface Props {
  error?: Error
}

export default function ErrorHanlder({
  error = new Error('Unexpected error. Try refreshing the page.'),
}: Props) {
  const router = useRouter()
  switch (error.message) {
    case 'FETCHER: 401':
      router.push('/api/auth/login')
      return <Loader />
    case 'FETCHER: 404':
      router.push('/404')
      return <Loader />
    case 'FETCHER: 500':
      router.push('/404')
      return <Loader />
    default:
      return <Typography>{`Error: ${error.message}`}</Typography>
  }
}
