import { useEffect, useState } from 'react'
import './Home.css'
import './RecruiterProfile.css'
import Chip from '../components/Chip'
import Button from '../components/Button'
import { getStoredProfile } from '../data/profileStorage'
import type { RecruiterUserProfile } from '../types/Profile'

const defaultCompanyImage =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
const defaultLogo = 'https://cdn-icons-png.flaticon.com/512/281/281764.png'

function RecruiterProfile() {
  const [profile, setProfile] = useState<RecruiterUserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStoredProfile()
      .then((stored) => {
        if (!stored || stored.role !== 'recruiter') {
          setError('No recruiter profile found.')
          return
        }
        setProfile(stored)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Could not load profile.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="home-page page"><p>Loading...</p></div>
  if (error || !profile) return <div className="home-page page"><p>{error ?? 'Profile unavailable.'}</p></div>

  const { recruiter } = profile
  const displayName = profile.name || recruiter.companyName || 'Recruiter'

  return (
    <div className="home-page page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image-section">
            <img src={defaultCompanyImage} alt="Office" className="profile-main-image" />
            <div className="profile-location-badge">
              {recruiter.hiringLocation || 'Location missing'}
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-header">
              <div>
                <h1 className="profile-name">{displayName}</h1>
                <h2 className="profile-role">
                  Recruiter at{' '}
                  <span className="profile-company">{recruiter.companyName || 'Swipe IT'}</span>
                </h2>
              </div>
              <img src={defaultLogo} alt="Logo" className="profile-logo" />
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">About</h3>
              <p className="profile-bio">{recruiter.rolePitch || 'No bio provided yet.'}</p>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">Company</h3>
              <div className="profile-chips">
                {recruiter.companySize ? <Chip>{recruiter.companySize}</Chip> : null}
                {recruiter.website ? <Chip>{recruiter.website}</Chip> : null}
                {recruiter.linkedIn ? <Chip>LinkedIn</Chip> : null}
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
