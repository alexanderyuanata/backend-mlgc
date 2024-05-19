const getClassification = require("../services/getClassification");
const crypto = require('crypto');
const getData = require("../services/getData");
const storeData = require("../services/storeData");

async function predictHandler(request, h){
  const { image } = request.payload;
  const { model } = request.server.app;

  //get the prediction from the model
  const { result, isCancer, suggestion } = await getClassification(model, image);

  //generate ID and current date time
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": result,
    "suggestion": suggestion,
    "createdAt" : createdAt,
  }

  //store data in Firestore
  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: (isCancer ? "Model is predicted successfully" : "Model is predicted successfully but under threshold. Please use the correct picture"),
    data,
  })
  response.code(201);
  return response;
};

async function getHistoryHandler(request, h){
  const data = await getData();

  const response = h.response({
    status: 'success',
    data: data,
  })
  response.code(200);
  return response;
}

function returnReady(request, h){
  const response = h.response({
    status: 'success',
    message: 'server is listening'
  })
  response.code(200);
  return response;
}

module.exports = { predictHandler, getHistoryHandler, returnReady };