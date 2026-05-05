import './Home.css'
import Chip from '../components/Chip'
import Button from '../components/Button'
import recruiterDataRaw from '../data/Recruiterprofile.json'

type RecruiterProfileData = {
  firstName: string
  lastName: string
  company: string
  role: string
  email: string
  location: string
  bio: string
  companyImage: string
  logo: string
  specialties: string[]
}

const recruiterData = recruiterDataRaw as RecruiterProfileData

function RecruiterProfile() {
  return (
    <div className="home-page page">
      {/* Vi ökar maxWidth till 1200px så den täcker mer av skärmen */}
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap', // Gör att den bryter rad på mobilen
          backgroundColor: 'white',
          borderRadius: '32px',
          overflow: 'hidden',
          color: '#1a1a1a',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          minHeight: '600px' // Ger kortet lite rejälare höjd
        }}>

          {/* Left Column: Image - Nu med dynamisk bredd */}
          <div style={{
            flex: '1 1 450px', // Tar minst 450px, men växer om det behövs
            position: 'relative',
            minHeight: '400px'
          }}>
            <img
              src={recruiterData.companyImage}
              alt="Office"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              padding: '10px 20px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              📍 {recruiterData.location}
            </div>
          </div>

          {/* Right Column: Info - Nu med mer luft (padding) */}
          <div style={{
            flex: '1 1 500px',
            padding: '60px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center' // Centrerar innehållet vertikalt
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '2.8rem', lineHeight: '1.1', color: '#1a1a1a' }}>
                  {recruiterData.firstName} {recruiterData.lastName}
                </h1>
                <h2 style={{ margin: '10px 0 0 0', fontSize: '1.3rem', color: '#555', fontWeight: '400' }}>
                  {recruiterData.role} at <span style={{ fontWeight: '600', color: '#000' }}>{recruiterData.company}</span>
                </h2>
              </div>
              <img src={recruiterData.logo} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#aaa', marginBottom: '15px' }}>About</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }}>
                {recruiterData.bio}
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#aaa', marginBottom: '15px' }}>
                Recruitment Expertise
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Kontrollera att det står .specialties här så det matchar JSON-filen */}
                {recruiterData.specialties?.map((skill: string) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Button variant="primary" to="/account" className="large-button">Edit Profile</Button>
              <Button variant="secondary" to="/search" className="large-button">Find Talent</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterProfile
