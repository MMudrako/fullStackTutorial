
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);


async function run() {
    try {
        await client.connect();
        const db = client.db("myBlogDB");
        const collection = db.collection("articlesInfoColtn");

        //insert docs
        await collection.insertMany([{ name: 'learn-node', upvotes: 0, comments: [] },
        { name: 'learn-react', upvotes: 0, comments: [] },
        { name: 'mongodb', upvotes: 0, comments: [] }]);

        //find docs
        const docs = await collection.find({}).toArray();
        console.log(docs);
    } finally {
        await client.close();
    }
}

run().catch(console.error);