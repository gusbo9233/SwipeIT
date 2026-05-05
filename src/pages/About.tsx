import Button from '../components/Button'
import './Home.css'

function About() {
  return (
    <div className="home-page page">
      <section className="hero-section">
        <div className="hero-copy">
          <h1>About Swipe IT</h1>
          <p>
            Swipe IT helps recruiters and candidates move from broad searching to focused
            matching with profile preferences and a swipe-based review flow.
          </p>
          <div className="hero-actions">
            <Button to="/register">Create Account</Button>
            <Button to="/search" variant="secondary">Start Searching</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
