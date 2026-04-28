import './Login.css'

function Login() {
  function handleLogin() {
    window.localStorage.setItem('swipeit:isLoggedIn', 'true')
    window.location.href = '/'
  }

  return (
    <div className="login-page">
      <a className="login-brand" href="/">
        <span className="brand-mark">SI</span>
        <span>Swipe IT</span>
      </a>

      <section className="login-card">
        <div className="login-icon material-symbols-outlined">login</div>
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to Swipe IT</h1>
        <p>
          Continue to your candidate and recruiter matching workspace. No
          credentials are required yet.
        </p>

        <div className="login-fields">
          <label className="login-field">
            Email
            <input
              autoComplete="email"
              placeholder="you@example.com"
              type="email"
            />
          </label>
          <label className="login-field">
            Password
            <input
              autoComplete="current-password"
              placeholder="Enter your password"
              type="password"
            />
          </label>
        </div>

        <button className="login-button" onClick={handleLogin} type="button">
          <span>Login</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </section>
    </div>
  )
}

export default Login
