const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const PredictionError = require('../error/predictionError');
 
(async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    //get model on server start
    const model = await loadModel();
    server.app.model = model;
 
    console.log('model loaded.');

    //fetch routes
    server.route(routes);

    //handle errors
    server.ext('onPreResponse', function(request, h){
      const response = request.response;

      if (response instanceof PredictionError){
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        })
        newResponse.code(response.statusCode)
        return newResponse;
      }

      //if we catch the server rejecting a request due too a large file size
      if (response.isBoom && response.output.statusCode === 413 && response.output.payload.error === "Request Entity Too Large"){
        console.log("caught too large upload");

        const newResponse = h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000',
        })
        newResponse.code(413)
        return newResponse;
      }

      return h.continue;
    });
 
    await server.start();
    console.log(`server started at: ${server.info.uri}`);
})();