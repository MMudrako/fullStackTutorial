
// localhost: 3000/articles/learn-node
import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import articles from '../article-content.js';
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentsList from "../CommentsList.jsx";
import AddCommentForm from "./AddCommentForm.jsx";
import useUser from '../useUser.jsx'
import { useNavigate } from "react-router-dom";


export default function ArticlePage() {
    const { name } = useParams();
    const { article: loadedArticle } = useLoaderData();
    const { comments: initialComments = [], upvoteIds: initialUpvoteIds = [] } = loadedArticle;
    const [upVotes, setUpvotes] = useState(initialUpvoteIds.length);
    const [comments, setComments] = useState(initialComments);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const { isLoading, user } = useUser();

    const navigate = useNavigate();
    //const articleId = params.articleId;
    //const { articleId } = useParams();

    //console.log("params: ", params);

    //!using index as child key is not good if the data is meant to change!!!!
    const article = articles.find(a => a.name === name);

    console.log("comments: ", initialComments, "upvoteIds:", initialUpvoteIds);

    async function upvoteClicked() {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        try {
            const response = await axios.post(`/api/articles/${name}/upvote`, null, { headers });
            const updatedArticleData = response.data;
            console.log(updatedArticleData);
            setUpvotes(updatedArticleData.upvoteIds.length);
        } catch (error) {
            setMessage('you can only upvote once for each article');
            console.log(updatedArticleData);
        }

    }

    async function onAddComment({ nameText, commentText }) {
        try {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.post(`/api/articles/${name}/comments`, {
                postedBy: nameText,
                text: commentText,
            }, { headers });
            const updatedArticleData = response.data;
            setComments(updatedArticleData.comments);
            setErrorMessage([]);
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data.errors) {
                setErrorMessage(err.response.data.errors.map(e => e.msg));
            } else {
                setErrorMessage(['Something went wrong. Try again later.']);
            }
        }

    }

    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
            <h1>Welcome to Article Page with id: {name}</h1>
            <p>Interesting information
                This article has: {upVotes} upvotes!
            </p>
            {message && <h4>{message}</h4>}
            <h2>{article.title}</h2>
            {user && <button onClick={upvoteClicked}>Upvote</button>}
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            {errorMessage.length > 0 && (
                <div className="error-messages">
                    <ul>
                        {errorMessage.map((msg, idx) => (
                            <li key={idx} style={{ color: 'red' }}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}
            {user
                ? <AddCommentForm onAddComment={onAddComment} />
                : <button onClick={() => navigate('/login')}>Log in to add a comment</button>
            }
            <CommentsList comments={comments} />
        </>

    )
}

export async function loader({ params }) {
    const { name } = params;
    const response = await axios.get(`/api/articles/${name}?timestamp=${Date.now()}`);

    return { article: response.data }
}