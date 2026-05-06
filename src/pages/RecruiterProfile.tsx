import './Home.css'
import Chip from '../components/Chip'
import Button from '../components/Button'
import recruiterData from '../data/Recruiterprofile.json'

type RecruiterDisplayProfile = {
  bio: string
  company: string
  companyImage: string
  firstName?: string
  lastName?: string
  location: string
  logo: string
  name?: string
  role: string
  specialties: string[]
}

const fallbackProfile: RecruiterDisplayProfile = recruiterData

function getActiveProfile(): RecruiterDisplayProfile {
  try {
    const storedProfile = window.localStorage.getItem('activeProfile')

    if (!storedProfile) {
      return fallbackProfile
    }

    return {
      ...fallbackProfile,
      ...(JSON.parse(storedProfile) as Partial<RecruiterDisplayProfile>),
    }
  } catch {
    return fallbackProfile
  }
}

function RecruiterProfile() {
  const data = getActiveProfile()
  const displayName = data.name || `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim()

  return (
    <div className="home-page page">
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            color: '#1a1a1a',
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: '600px',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: '1 1 450px', minHeight: '400px', position: 'relative' }}>
            <img
              alt="Office"
              src={data.companyImage}
              style={{ height: '100%', objectFit: 'cover', width: '100%' }}
            />
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '50px',
                bottom: '30px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '0.9rem',
                fontWeight: '600',
                left: '30px',
                padding: '10px 20px',
                position: 'absolute',
              }}
            >
              {data.location}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flex: '1 1 500px',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                alignItems: 'flex-start',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '30px',
              }}
            >
              <div>
                <h1 style={{ color: '#1a1a1a', fontSize: '2.8rem', lineHeight: '1.1', margin: 0 }}>
                  {displayName}
                </h1>
                <h2 style={{ color: '#555', fontSize: '1.3rem', fontWeight: '400', margin: '10px 0 0 0' }}>
                  {data.role} at{' '}
                  <span style={{ color: '#000', fontWeight: '600' }}>{data.company}</span>
                </h2>
              </div>
              <img
                alt="Logo"
                src={data.logo}
                style={{ height: '60px', objectFit: 'contain', width: '60px' }}
              />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  color: '#aaa',
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  marginBottom: '15px',
                  textTransform: 'uppercase',
                }}
              >
                About
              </h3>
              <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: '1.7' }}>
                {data.bio}
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  color: '#aaa',
                  fontSize: '0.8rem',
                  letterSpacing: '2px',
                  marginBottom: '15px',
                  textTransform: 'uppercase',
                }}
              >
                Recruitment Expertise
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {data.specialties.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Button className="large-button" to="/profile" variant="primary">
                Edit Profile
              </Button>
              <Button className="large-button" to="/search" variant="secondary">
                Find Talent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterProfile
