const { Firestore } = require('@google-cloud/firestore')

async function getData() {
  const db = new Firestore();
 
  const collectionRef = db.collection('predictions');
  const documentList = await collectionRef.get();

  //create the array to hold all history
  let data = [];

  documentList.forEach(entry => {
    const entryData = {
      id: entry.id,
      history: entry.data(),
    };
    
    data.push(entryData);
  });

  return data;
}
 
module.exports = getData;