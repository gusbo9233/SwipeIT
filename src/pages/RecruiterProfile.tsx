import { useEffect, useState } from 'react'
import './Home.css'
import Chip from '../components/Chip'
import Button from '../components/Button'
// @ts-ignore
import recruiterDataRaw from '../data/Recruiterprofile.json'

function RecruiterProfile() {
  // 1. Skapa en state för att hålla profilens data
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // 2. Kolla om det finns data sparad i localStorage (från Register-sidan)
    const savedProfile = localStorage.getItem('activeProfile');

    if (savedProfile) {
      // Om den finns, använd den!
      setData(JSON.parse(savedProfile));
    } else {
      // Annars, använd din JSON-fil som backup (default)
      setData(recruiterDataRaw);
    }
  }, []);

  // 3. Om data inte hunnit laddas än (viktigt för att undvika krasch)
  if (!data) return null;

  return (
    <div className="home-page page">
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: 'white',
          borderRadius: '32px',
          overflow: 'hidden',
          color: '#1a1a1a',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          minHeight: '600px'
        }}>

          {/* Left Column: Image */}
          <div style={{
            flex: '1 1 450px',
            position: 'relative',
            minHeight: '400px'
          }}>
            <img
              src={data.companyImage || recruiterDataRaw.companyImage} // Använd bild från JSON om ingen ny finns
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
              📍 {data.location || 'Location missing'}
            </div>
          </div>

          {/* Right Column: Info */}
          <div style={{
            flex: '1 1 500px',
            padding: '60px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '2.8rem', lineHeight: '1.1', color: '#1a1a1a' }}>
                  {/* Här kollar vi om namnet kommer från Register (data.name) eller JSON (data.firstName) */}
                  {data.name || `${data.firstName} ${data.lastName}`}
                </h1>
                <h2 style={{ margin: '10px 0 0 0', fontSize: '1.3rem', color: '#555', fontWeight: '400' }}>
                  {data.role} at <span style={{ fontWeight: '600', color: '#000' }}>{data.company || 'Swipe IT'}</span>
                </h2>
              </div>
              <img src={data.logo || recruiterDataRaw.logo} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#aaa', marginBottom: '15px' }}>About</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }}>
                {data.bio || 'No bio provided yet.'}
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#aaa', marginBottom: '15px' }}>
                Recruitment Expertise
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Vi mappar antingen specialties från JSON eller expertise från Register */}
                {(data.specialties || data.expertise || []).map((skill: string) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
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