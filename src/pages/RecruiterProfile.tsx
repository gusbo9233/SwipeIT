import { useEffect, useState } from 'react'
import './Home.css'
import './RecruiterProfile.css'
import Chip from '../components/Chip'
import Button from '../components/Button'
// @ts-ignore
import recruiterDataRaw from '../data/Recruiterprofile.json'

function RecruiterProfile() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('activeProfile');

    if (savedProfile) {
      setData(JSON.parse(savedProfile));
    } else {
      setData(recruiterDataRaw);
    }
  }, []);

  if (!data) return null;

  return (
    <div className="home-page page">
      <div className="profile-container">
        <div className="profile-card">
          
          <div className="profile-image-section">
            <img
              src={data.companyImage || recruiterDataRaw.companyImage}
              alt="Office"
              className="profile-main-image"
            />
            <div className="profile-location-badge">
              📍 {data.location || 'Location missing'}
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-header">
              <div>
                <h1 className="profile-name">
                  {data.name || `${data.firstName} ${data.lastName}`}
                </h1>
                <h2 className="profile-role">
                  {data.role} at <span className="profile-company">{data.company || 'Swipe IT'}</span>
                </h2>
              </div>
              <img src={data.logo || recruiterDataRaw.logo} alt="Logo" className="profile-logo" />
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
                {(data.specialties || data.expertise || []).map((skill: string) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            <div className="profile-actions">
              <Button variant="primary" className="large-button">Edit Profile</Button>
              <Button variant="secondary" to="/search" className="large-button">Find Talent</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterProfile