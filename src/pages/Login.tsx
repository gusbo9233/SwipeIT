import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();

  // The 'action' function receives the previous state and the FormData object
  async function loginAction(prevState: string | null, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return "Both email and password are required.";
    }

    const user = await login(email, password);
    
    if (user) {
      navigate('/');
      return null;
    } else {
      return "Invalid email or password.";
    }
  }

  // error is the return value of loginAction; isPending tracks the loading state
  const [error, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="login-page page">
      <section className="login-card">
        <h1>Log in to Swipe IT</h1>
        
        {error && (
          <div className="login-error-banner" role="alert">
            {error}
          </div>
        )}

        {/* Use 'action' prop instead of 'onSubmit' */}
        <form action={formAction} className="login-form">
          <div className="login-fields">
            <label className="login-field">
              Email
              <input name="email" type="email" required />
            </label>
            <label className="login-field">
              Password
              <input name="password" type="password" required />
            </label>
          </div>

          <button 
            className="login-button" 
            type="submit" 
            disabled={isPending}
          >
            <span>{isPending ? 'Logging in...' : 'Login'}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;