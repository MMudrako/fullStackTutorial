import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import NavBar from './Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticlesListPage from './pages/ArticlesListPage'

import ArticlePage from './pages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {


  return (
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
  )
}

export default App
