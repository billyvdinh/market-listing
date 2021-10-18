import Head from 'next/head'
import React from 'react'
import Header from './Header'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Market Listing</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Industrial good in a circular economy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout
