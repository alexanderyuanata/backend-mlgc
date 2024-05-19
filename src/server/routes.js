const { predictHandler, getHistoryHandler, returnReady } = require('./handler')

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
  },
  //a route for cloud run HTTP checks
  {
    path: '/ready',
    method: 'GET',
    handler: returnReady,
  }
]

module.exports = routes;