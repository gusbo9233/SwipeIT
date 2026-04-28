import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} SwipeIT. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
