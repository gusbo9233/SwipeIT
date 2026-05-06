import './Home.css'
import './RecruiterProfile.css'
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
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image-section">
            <img
              src={data.companyImage}
              alt="Office"
              className="profile-main-image"
            />
            <div className="profile-location-badge">
              {data.location || 'Location missing'}
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-header">
              <div>
                <h1 className="profile-name">
                  {displayName}
                </h1>
                <h2 className="profile-role">
                  {data.role} at <span className="profile-company">{data.company || 'Swipe IT'}</span>
                </h2>
              </div>
              <img src={data.logo} alt="Logo" className="profile-logo" />
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">About</h3>
              <p className="profile-bio">
                {data.bio || 'No bio provided yet.'}
              </p>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">Recruitment Expertise</h3>
              <div className="profile-chips">
                {data.specialties.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            <div className="profile-actions">
              <Button variant="primary" to="/profile" className="large-button">Edit Profile</Button>
              <Button variant="secondary" to="/search" className="large-button">Find Talent</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterProfile
