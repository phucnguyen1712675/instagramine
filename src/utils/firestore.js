// Get doc data and merge doc.id
export function getDocData(doc) {
  return doc.exists() ? {id: doc.id, ...doc.data()} : null;
}

// Get array of doc data from collection
export function getCollectionData(docs) {
  return docs
    .filter((doc) => doc.exists())
    .map((doc) => ({id: doc.id, ...doc.data()}));
}
