import React from 'react'
import { object } from 'prop-types'
import urlJoin from 'url-join'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import { PageContainer } from '../components'
import { config as settings, socialLinks } from '../../site.config'

const { name, title, url, logo } = settings

const HomePage = ({ meta }) => (
  <PageContainer meta={meta}>
    <SocialProfileJsonLd
      type="Organization"
      name={name}
      url={url}
      sameAs={[socialLinks.twitter]}
    />
    <LogoJsonLd url={url} logo={logo} />
    <Prose>
      <p>Get a theme-able Next.js site up and running quickly</p>
    </Prose>
  </PageContainer>
)

HomePage.propTypes = {
  meta: object
}

export async function getStaticProps() {
  return {
    props: {
      meta: {
        canonical: urlJoin(url, '/'),
        customTitle: true,
        title
      }
    }
  }
}

export default HomePage
