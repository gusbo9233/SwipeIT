import Home from './pages/Home'
import Register from './pages/Register'
import './App.css'

function App() {
  if (window.location.pathname === '/register') {
    return <Register />
  }

  return <Home />
}

export default App
