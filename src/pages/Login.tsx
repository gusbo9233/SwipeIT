import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="login-page page">
      <section className="login-card">
        <div className="login-icon material-symbols-outlined">login</div>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to Swipe IT</h1>
        <p>Continue to your candidate and recruiter matching workspace.</p>

        <div className="login-fields">
          <label className="login-field">
            Email
            <input
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              value={email}
            />
          </label>
          <label className="login-field">
            Password
            <input
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              value={password}
            />
          </label>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" disabled={loading} onClick={handleLogin} type="button">
          <span>{loading ? 'Logging in…' : 'Login'}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </section>
    </div>
  )
}

export default Login
