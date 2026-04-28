import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  if (window.location.pathname === '/login') {
    return <Login />
  }

  if (window.location.pathname === '/register') {
    return <Register />
  }

  return <Home />
}

export default App
