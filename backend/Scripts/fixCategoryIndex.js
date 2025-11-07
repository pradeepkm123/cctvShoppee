require('dotenv').config(); // Load MONGO_URI
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const fixCategoryIndex = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const collection = db.collection('categories');

  try {
    const indexes = await collection.indexes();
    const badIndex = indexes.find(index => index.name === 'id_1');

    if (badIndex) {
      await collection.dropIndex('id_1');
      console.log('✅ Dropped duplicate index "id_1" from categories collection');
    } else {
      console.log('✔️ No bad "id_1" index found');
    }
  } catch (err) {
    console.error('❌ Error dropping index:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

fixCategoryIndex();
