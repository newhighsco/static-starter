import React from 'react'
import { func, object } from 'prop-types'
import Router from 'next/router'
import withGA from 'next-ga'
import { SiteContainer, ThemeProvider } from '@newhighsco/chipset'
import Meta from '../components/Meta'
import { config, meta } from '../site.config'
import theme from '../theme'

import './_app.scss'

const AppContainer = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <SiteContainer>
      <Meta {...meta}>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Meta>
      <Component {...pageProps} />
    </SiteContainer>
  </ThemeProvider>
)

AppContainer.propTypes = {
  Component: func,
  pageProps: object
}

export default withGA(config.googleTrackingId, Router)(AppContainer)
