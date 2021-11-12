import { UserProvider } from '@auth0/nextjs-auth0'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import Layout from '../components/common/Layout'
import createEmotionCache from '../lib/mui/createEmotionCache'
import theme from '../lib/mui/theme'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <SnackbarProvider maxSnack={3}>
      <CacheProvider value={emotionCache}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </UserProvider>
      </CacheProvider>
    </SnackbarProvider>
  )
}
