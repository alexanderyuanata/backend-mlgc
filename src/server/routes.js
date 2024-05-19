const { predictHandler, getHistoryHandler } = require('./handler')

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: predictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000,
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoryHandler,
  }
]

module.exports = routes;