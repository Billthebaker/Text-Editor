import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the database already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // If it does not exist, create a new object store with an auto-incrementing key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Initialize the database
initdb();

export const putDb = async (content) => {
  // Open the database and start a read-write transaction
  const jateDB = await openDB ('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Put the content into the object store
  const request = store.put({ id: 1, value: content });
  const result = await request;
  return result.value;
};

export const getDb = async () => {
  // Open the database and start a read-only transaction
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get all the values from the object store
  const request = store.getAll();
  const result = await request;
  return result.value;
};
