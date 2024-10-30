import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/"
//"mongodb+srv://mongodb:Nilesh123@<your-cluster-url>/test";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { number } = req.body;

    try {
      await client.connect();
      const database = client.db("factorial");
      const collection = database.collection("numberr");

      // Insert the number into the "numberr" collection
      await collection.insertOne({ number: parseInt(number) });
      res.status(200).json({ status: 'success', message: 'Number stored successfully' });
    } catch (error) {
      console.error('Error storing number in MongoDB:', error);
      res.status(500).json({ status: 'fail', message: 'Failed to store the number' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
