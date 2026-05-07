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
    try {
      // 1. Hämta den inloggade profilen från localStorage
      const savedProfile = localStorage.getItem('activeProfile');
      
      if (savedProfile) {
        // Om det finns en inloggad person, använd den datan
        setData(JSON.parse(savedProfile));
      } else {
        // Annars faller vi tillbaka på JSON-filen (bra för presentationen!)
        setData(recruiterDataRaw);
      }
    } catch (error) {
      console.error("Något gick fel vid hämtning av profil:", error);
      setData(recruiterDataRaw); // Fallback så sidan inte kraschar
    }
  }, []); 

  // Om data fortfarande laddas eller saknas, visa ett meddelande eller fallback
  if (!data) return <div className="page">Laddar profil...</div>;

  const displayName = data.name || data.companyName || "Okänd Rekryterare";

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
                  {displayName}
                </h1>
                <h2 className="profile-role">
                  {data.role || 'Recruiter'} at <span className="profile-company">{data.company || data.companyName || 'Swipe IT'}</span>
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
                {(data.specialties || data.expertise || []).map((skill: string, index: number) => (
                  <Chip key={index}>{skill}</Chip>
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

export default RecruiterProfile;