const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset'
])
const withImages = require('next-images')
const withSitemap = require('@newhighsco/next-plugin-sitemap')
const withRobots = require('@newhighsco/next-plugin-robots')
const withCssOptions = require('./src/plugins/css-options')

const nextConfig = {
  exportTrailingSlash: true,
  poweredByHeader: false,
  env: {
    SITE_URL: 'https://starter.newhighsco.re/',
    DISALLOW_ROBOTS: true
  },
  exportPathMap: defaultPathMap => {
    const customPathMap = { '/404.html': { page: '404' } }
    const pathMap = Object.assign(customPathMap, defaultPathMap)
    const ignorePaths = ['/404', '/index']

    ignorePaths.map(path => delete pathMap[path])

    return pathMap
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            svgoConfig: {
              plugins: [{ prefixIds: false }]
            }
          }
        }
      ]
    })

    return config
  }
}

module.exports = withPlugins(
  [
    [withTranspileModules],
    [
      withImages,
      {
        exclude: /\.svg$/,
        inlineImageLimit: 1
      }
    ],
    [withCssOptions, { cssModulesOptions: { mode: 'local' } }],
    [withSitemap, { sitemap: { hostname: nextConfig.env.SITE_URL } }],
    [
      withRobots,
      { robots: { disallowPaths: nextConfig.env.DISALLOW_ROBOTS ? ['/'] : [] } }
    ]
  ],
  nextConfig
)