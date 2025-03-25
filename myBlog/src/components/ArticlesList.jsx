import { Link } from 'react-router-dom'


export default function ArticlesList({ articles }) {
    return (
        <ol>
            {articles.map(article => (
                <li key={article.name}><Link className="article-list-item" to={`/articles/${article.name}`}>
                    {article.title}
                    <p>{article.content[0].substring(0, 150)}...</p>
                </Link>
                </li>
            ))}
        </ol>
    )
}

