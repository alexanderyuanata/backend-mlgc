const { Firestore } = require('@google-cloud/firestore')

async function storeData(id, data) {
  const db = new Firestore();
 
  const collection = db.collection('predictions');
  return collection.doc(id).set(data);
}
 
module.exports = storeData;