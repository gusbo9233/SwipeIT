import { useActionState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../context/AuthProvider'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  async function loginAction(_prevState: string | null, formData: FormData) {
    const email = (formData.get('email') as string).trim().toLowerCase()
    const password = formData.get('password') as string

    if (!email || !password) {
      return 'Both email and password are required.'
    }

    const user = await login(email, password)

    if (!user) {
      return 'Invalid email or password.'
    }

    navigate(user.role === 'recruiter' ? '/recruiterprofile' : '/profile')
    return null
  }

  const [error, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className="login-page page">
      <section className="login-card">
        <h1>Log in to Swipe IT</h1>
        <p>
          Continue to your candidate and recruiter matching workspace.
        </p>

        {error ? (
          <div className="login-error-banner" role="alert">
            {error}
          </div>
        ) : null}

        <form action={formAction} className="login-form">
          <div className="login-fields">
            <label className="login-field">
              Email
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>
            <label className="login-field">
              Password
              <input
                autoComplete="current-password"
                name="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </label>
          </div>

          <button className="login-button" disabled={isPending} type="submit">
            <span>{isPending ? 'Logging in...' : 'Login'}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </section>
    </div>
  )
}

export default Login
