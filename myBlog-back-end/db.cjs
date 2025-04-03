
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL;
console.log('MongoDB Connection String:', uri); // To verify it’s loaded correctly

const client = new MongoClient(uri);


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