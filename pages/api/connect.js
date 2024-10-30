import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri ="mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/"
  //"mongodb+srv://mongodb:Nilesh123@<your-cluster-url>/test";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    res.status(500).json({ status: 'fail' });
  } finally {
    await client.close();
  }
}
