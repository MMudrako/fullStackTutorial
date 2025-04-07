import express from 'express';
import connectDB from '../db.cjs'
import { ReturnDocument } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

//import cors from 'cors';


const credentials = JSON.parse(
    fs.readFileSync('./fullstacktutorial-695cc-cred.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


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
        //console.log('Loader data:', article);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch article' })
    }

});

//middleware to control the user activity
app.use(async function (req, res, next) {
    const { authtoken } = req.headers;

    if (authtoken) {
        const user = await admin.auth().verifyIdToken(authtoken);
        req.user = user;
        next();
    } else {
        res.sendStatus(400)
    }


});



app.post('/api/articles/:name/upvote', async (req, res) => {

    const { name } = req.params;
    const { uid } = req.user;

    //upvoteIds: [userId, userId, ]



    const collection = db.collection('articlesInfoColtn');
    const article = await collection.findOne({ name });

    const upvoteIds = article.upvoteIds || [];// how does it gets the upvoteIds? upvotes are number type parameter in the database, but uid is the result of firebase authorization logic?
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
        const updateArticle = await collection.findOneAndUpdate({ name }, {
            $push: { upvoteIds: uid },
        }, {
            ReturnDocument: "after"
        });
        res.json(updateArticle);
    } else {
        res.sendStatus(403);//not authorized to do what they are trying to do

    }

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