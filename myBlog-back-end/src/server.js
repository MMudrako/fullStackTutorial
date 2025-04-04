import express from 'express';
import connectDB from '../db.cjs'
import { ReturnDocument } from 'mongodb';

//import cors from 'cors';



const app = express();

app.use(express.json());

const db = await connectDB();

//testing server connection
app.get('/hello', function (req, res) {
    res.send('Hello from GET endpoint!')
});

app.get('/hello/:name', function (req, res) {
    res.send('Hello, ' + req.params.name)
})

app.post('/hello', function (req, res) {
    res.send('Hello, ' + req.body.name + ' from a POST endpoint!')
})


//testing REST API with postman
/* app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a => a.name === req.params.name);
    article.upvotes += 1;

    //res.send('Hey! The article ' + req.params.name + 'now has ' + article.upvotes + ' upvotes!')
    res.json(article);
});

app.post('/api/articles/:name/comments', (req, res) => {
    const {name } = req.params;
    const {postedBy, text} = req.body;

    const article = articleInfo.find(a => a.name === name);

    article.comments.push({
        postedBy,
        text
    });

    res.json(article);

}) */

//connecting endpoints with database
app.get('/api/articles/:name', async (req, res) => {
    try {

        const { name } = req.params;
        const collection = db.collection('articlesInfoColtn');
        const article = await collection.findOne({ name });

        // Set Cache-Control header
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch article' })
    }

});

app.post('/api/articles/:name/upvote', async (req, res) => {

    const { name } = req.params;
    const collection = db.collection('articlesInfoColtn');
    const updateArticle = await collection.findOneAndUpdate({ name }, {
        $inc: { upvotes: 1 }
    }, {
        ReturnDocument: "after"
    });
    res.json(updateArticle);
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text };
    const collection = db.collection('articlesInfoColtn');
    const updateArticle = await collection.findOneAndUpdate({ name }, {
        $push: { comments: newComment }
    }, {
        ReturnDocument: 'after',
    });
    res.json(updateArticle);
})

//start the server
app.listen(8000, function () {
    console.log(`server is listening at http://localhost:8000`)
})