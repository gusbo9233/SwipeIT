import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthProvider';
import credentialsData from '../data/AccountCredentials.json';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function loginAction(prevState: string | null, formData: FormData) {
    const email = (formData.get('email') as string).trim().toLowerCase();
    const password = formData.get('password') as string;

    if (!email || !password) {
      return 'Both email and password are required.'
    }

    // 1. Kolla 'activeProfile' (Detta är vad som syns i din Application-tab!)
    const activeProfile = localStorage.getItem('activeProfile');
    if (activeProfile) {
      const profileData = JSON.parse(activeProfile);
      // I din bild heter fältet bara "email"
      const savedEmail = (profileData.email || "").trim().toLowerCase();

   if (savedEmail === email) {
  // Logga in användaren i ditt Auth-system
  login(email, password); 
  
  // Åk till adressen vi skapade i App.tsx (utan bindestreck!)
  navigate('/recruiterprofile'); 
  return null;
}
    }

    // 2. Kolla 'temp_reg_data' (Som en extra säkerhet baserat på din bild)
    const tempReg = localStorage.getItem('temp_reg_data');
    if (tempReg) {
      const tempData = JSON.parse(tempReg);
      if (tempData.email.toLowerCase() === email) {
        login(email, password);
        navigate('/recruiter-profile');
        return null;
      }
    }

    // 3. Fallback till JSON
    const hardcodedUser = credentialsData.find((user) => user.email.toLowerCase() === email);
    if (hardcodedUser) {
      const success = await login(email, password);
      if (success) {
        navigate(hardcodedUser.role === 'recruiter' ? '/recruiter-profile' : '/');
        return null;
      }
    }

    return "Invalid email or password.";
  }

  const [error, formAction, isPending] = useActionState(loginAction, null);

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
