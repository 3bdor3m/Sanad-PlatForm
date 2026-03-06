import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI; // Has /Sanad-Platform?
const baseUri = uri.replace('/Sanad-Platform', '/'); // strip it out to connect to root/admin 

async function migrate() {
  const MongoClient = mongoose.mongo.MongoClient;
  const client = new MongoClient(baseUri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const sourceDb = client.db('test');
    const destDb = client.db('Sanad-Platform');

    const collections = await sourceDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections in "test".`);

    for (const collInfo of collections) {
      if (collInfo.name === 'system.profile') continue;

      const collName = collInfo.name;
      console.log(`Migrating collection: ${collName}`);

      const sourceCollection = sourceDb.collection(collName);
      const destCollection = destDb.collection(collName);

      const docs = await sourceCollection.find({}).toArray();
      
      if (docs.length > 0) {
        // Drop existing collection in destination just in case so we don't have duplicate key errors during copy
        try {
          await destCollection.drop();
        } catch (e) {
             // ignore if doesn't exist
        }
        await destCollection.insertMany(docs);
        console.log(`✅ Copied ${docs.length} documents from ${collName}.`);
      } else {
        console.log(`Collection ${collName} is empty.`);
      }
    }

    console.log('Dropping "test" database...');
    await sourceDb.dropDatabase();
    console.log('✅ Dropped "test" database successfully.');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.close();
  }
}

migrate();
