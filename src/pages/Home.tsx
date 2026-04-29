import Button from '../components/Button'
import CandidateSwipePreview from '../components/CandidateSwipePreview'
import './Home.css'

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
        <section className="hero-section">
          <div className="hero-copy">
            <h1>Swipe IT</h1>
            <p>Connect candidates and recruiters with a focused swipe flow.</p>
            <div className="hero-actions">
              <Button href="/register">
                Get Started
              </Button>
              <Button href="/search" variant="secondary">
                Search
              </Button>
            </div>
          </div>

          <CandidateSwipePreview candidate={previewCandidate} />
        </section>
    </div>
  )
}

export default Home
