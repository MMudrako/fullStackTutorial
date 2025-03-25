
import ArticlesList from '../components/ArticlesList'
import articles from './article-content';

export default function ArticlesListPage() {

    return (
        <>
            <h1>Welcome to ArticlesList Page! </h1>
            <ArticlesList articles={articles} />
        </>

    )
}