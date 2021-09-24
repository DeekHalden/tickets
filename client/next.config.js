module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: 'enabled',
  },
  automock: false,
}
