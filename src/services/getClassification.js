const tf = require('@tensorflow/tfjs-node');
const PredictionError = require('../error/predictionError');


async function getClassification(model, image){
  try {
    //build a tensor out of parameter image
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

    const prediction = model.predict(tensor);
    const resultScore = await prediction.data();

    const score = resultScore * 100;
    const isCancer = score > 50;

    let suggestion, result;

    if (isCancer){
      suggestion = "Model mendeteksi kanker. Segera periksa ke dokter!";
      result = "Cancer";
    }
    else {
      suggestion = "Model tidak mendeteksi kanker.";
      result = "Non-cancer";
    }

    return { result, isCancer, suggestion };
  }
  catch(error) {
    //throw a generic prediction error
    console.log(error);
    throw new PredictionError('Terjadi kesalahan dalam melakukan prediksi', 400);
  }
};

module.exports = getClassification;