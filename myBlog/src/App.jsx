import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticlesListPage from './pages/ArticlesListPage'
import ArticlePage, { loader as articleLoader } from './pages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element: <AboutPage />
  }, {
    path: '/articles',
    element: <ArticlesListPage />
  }, {
    path: '/articles/:name', // -> /articles/learn-react
    element: <ArticlePage />,
    loader: articleLoader,

  }]
}]


const router = createBrowserRouter(routes);

function App() {

  // other option using BrowswerRouter and Routes
  /* return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={< AboutPage />} />
            <Route path="/articles" element={< ArticlesListPage />} />
            <Route path="/articles/:articleId" element={< ArticlePage />} />
            <Route path='*' element={<NotFoundPage />}></Route>
          </Routes>
        </div>


      </div>

    </BrowserRouter>
  ) */

  return (
    <>


      <RouterProvider router={router} />

    </>


  )


}

export default App
