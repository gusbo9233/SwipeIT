import Button from '../components/Button'
import CandidateSwipePreview from '../components/CandidateSwipePreview'
import SiteHeader from '../components/SiteHeader'
import './Home.css'

const navItems = ['Search', 'Login', 'Register']

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
  return (
    <div className="home-page">
      <SiteHeader navItems={navItems} />

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-copy">
            <h1>Swipe IT</h1>
            <p>Connect candidates and recruiters with a focused swipe flow.</p>
            <div className="hero-actions">
              <Button href="#">
                Get Started
              </Button>
              <Button href="#" variant="secondary">
                Search
              </Button>
            </div>
          </div>

          <CandidateSwipePreview candidate={previewCandidate} />
        </section>
      </main>
    </div>
  )
}

export default Home
