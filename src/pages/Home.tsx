import { Link } from 'react-router-dom'
import Button from '../components/Button'
import CandidateSwipePreview from '../components/CandidateSwipePreview'
import { useAuth } from '../context/AuthProvider'
import './Home.css'
import { aboutRoute } from './About'
import { searchRoute } from './Search'
import { registerRoute } from './Register'
import { loginRoute } from './Login'

export const homeRoute = '/'

const previewCandidate = {
  initials: 'AM',
  label: 'Candidate preview',
  name: 'Alex Morgan',
  role: 'Frontend Developer',
  summary:
    'Builds polished product interfaces with strong TypeScript and design-system experience.',
  metrics: [
    { value: '4 yrs', label: 'Experience' },
    { value: 'Stockholm', label: 'Hybrid' },
    { value: '92%', label: 'Match' },
  ],
  skills: ['React', 'TypeScript', 'Node.js'],
}

function Home() {
  const { user } = useAuth()

  return (
    <div className="home-page page">
      <section className="hero-section">
        <div className="hero-copy">
          <h1>Swipe IT</h1>
          <p>Connect candidates and recruiters with a focused swipe flow.</p>
          <div className="hero-actions">
            {!user ? (
              <>
                <Button to={registerRoute}>
                  Register
                </Button>
                <Button to={loginRoute} variant="secondary">
                  Login
                </Button>
              </>
            ) : user.role === 'recruiter' ? (
              <Button to={searchRoute}>
                Start Searching
              </Button>
            ) : null}
          </div>
        </div>

        <CandidateSwipePreview candidate={previewCandidate} />
      </section>
      <section className="home-about-promo">
        <p>Want to learn how the recruiter-first swipe model works?</p>
        <p>Discover our approach to talent discovery and IT hiring on the About page.</p>
        <Link className="button button-secondary" to={aboutRoute}>About Swipe IT</Link>
      </section>
    </div>
  )
}

export default Home
