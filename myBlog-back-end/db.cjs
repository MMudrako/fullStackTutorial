
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL;
console.log('MongoDB Connected'); // To verify it’s loaded correctly

const client = new MongoClient(uri, {
    tls: true,
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});



async function connectDB() {
    let db;
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        db = client.db('myBlogDB')
        return db;
    } catch (error) {
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;