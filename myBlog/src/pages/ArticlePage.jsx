
// localhost: 3000/articles/learn-node
import { useParams } from "react-router-dom";
import articles from '../article-content';
import NotFoundPage from "./NotFoundPage";

export default function ArticlePage() {
    const { name } = useParams();
    //const articleId = params.articleId;
    //const { articleId } = useParams();

    //console.log("params: ", params);

    //!using index as child key is not good if the data is meant to change!!!!
    const article = articles.find(a => a.name === name)

    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
            <h1>Welcome to Article Page with id: {name}</h1>
            <p>Interesting information</p>
            <h2>{article.title}</h2>

            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
        </>

    )
}