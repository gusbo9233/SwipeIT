import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="content">
      <Header />
      <main className="site-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} SwipeIT. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
