
// localhost: 3000/articles/learn-node
import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import articles from '../article-content.js';
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentsList from "../CommentsList.jsx";
import AddCommentForm from "./AddCommentForm.jsx";

export default function ArticlePage() {
    const { name } = useParams();
    const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [comments, setComments] = useState(initialComments);

    //const articleId = params.articleId;
    //const { articleId } = useParams();

    //console.log("params: ", params);

    //!using index as child key is not good if the data is meant to change!!!!
    const article = articles.find(a => a.name === name)

    async function upvoteClicked() {
        const response = await axios.post(`/api/articles/${name}/upvote`);
        const updatedArticleData = response.data;
        setUpvotes(updatedArticleData.upvotes);
    }

    async function onAddComment({ nameText, commentText }) {
        const response = await axios.post(`/api/articles/${name}/comments`, {
            postedBy: nameText,
            text: commentText,
        });
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments);
    }

    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
            <h1>Welcome to Article Page with id: {name}</h1>
            <p>Interesting information
                This article has: {upvotes} upvotes!
            </p>
            <h2>{article.title}</h2>
            <button onClick={upvoteClicked}>Upvote</button>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <AddCommentForm onAddComment={onAddComment} />
            <CommentsList comments={comments} />
        </>

    )
}

export async function loader({ params }) {
    const { name } = params;
    const response = await axios.get(`/api/articles/${name}?timestamp=${Date.now()}`);
    const { upvotes, comments } = response.data;
    return { upvotes, comments }
}