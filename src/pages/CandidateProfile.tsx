import Button from '../components/Button'
import { useAuth } from '../context/AuthProvider'
import {
  getProfileForUser,
  getStoredProfile,
} from '../data/profileStorage'
import type { CandidateProfileData, UserProfile } from '../types/Profile'
import { profileRoute } from './Profile'
import './Profile.css'

export const candidateProfileRoute = '/candidate-profile'

const fallbackProfile: UserProfile = {
  candidate: {
    fullName: 'Your candidate profile',
    github: '',
    linkedIn: '',
    phoneNumber: '',
    skills: ['React', 'TypeScript', 'Node.js'],
    workPreferences: ['full-time'],
  },
  email: '',
  name: 'Your candidate profile',
  recruiter: {
    companyName: '',
    companySize: '',
    email: '',
    hiringLocation: '',
    linkedIn: '',
    rolePitch: '',
    website: '',
  },
  role: 'candidate',
}

function CandidateProfile() {
  const { user } = useAuth()
  const profile = user
    ? getStoredProfile(user) ?? getProfileForUser(user)
    : getStoredProfile() ?? fallbackProfile
  const candidate = profile.candidate
  const displayName = candidate.fullName || profile.name || 'Candidate'
  const initials = getInitials(displayName)
  const skills = getVisibleList(candidate.skills, ['React', 'TypeScript', 'Node.js'])
  const workPreferences = getVisibleList(candidate.workPreferences, ['Open to opportunities'])

  return (
    <div className="candidate-profile-view page">
      <section className="candidate-profile-preview" aria-label="Recruiter profile preview">
        <div className="candidate-profile-card">
          <div className="candidate-profile-hero">
            <div className="candidate-profile-avatar" aria-hidden="true">
              {initials}
            </div>
            <div className="candidate-profile-hero-copy">
              <p className="candidate-profile-kicker">Recruiter preview</p>
              <h1>{displayName}</h1>
              <p>
                {buildSummary(candidate)}
              </p>
            </div>
          </div>

          <div className="candidate-profile-body">
            <section className="candidate-profile-section" aria-labelledby="candidate-skills-title">
              <h2 id="candidate-skills-title">Skills</h2>
              <div className="candidate-profile-chip-list">
                {skills.map((skill) => (
                  <span className="candidate-profile-chip" key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className="candidate-profile-section" aria-labelledby="candidate-preferences-title">
              <h2 id="candidate-preferences-title">Working Preferences</h2>
              <div className="candidate-profile-chip-list">
                {workPreferences.map((preference) => (
                  <span className="candidate-profile-chip candidate-profile-chip-muted" key={preference}>
                    {formatLabel(preference)}
                  </span>
                ))}
              </div>
            </section>

            <section className="candidate-profile-section" aria-labelledby="candidate-contact-title">
              <h2 id="candidate-contact-title">Contact</h2>
              <div className="candidate-profile-contact-list">
                <ContactItem icon="mail" label="Email" value={profile.email} />
                <ContactItem icon="call" label="Phone" value={candidate.phoneNumber} />
                <ContactItem icon="link" label="LinkedIn" value={candidate.linkedIn} />
                <ContactItem icon="code" label="GitHub" value={candidate.github} />
              </div>
            </section>
          </div>
        </div>

        <aside className="candidate-profile-actions" aria-label="Profile actions">
          <div>
            <p className="candidate-profile-kicker">Candidate profile</p>
            <h2>Keep your recruiter view ready.</h2>
            <p>
              This is the profile recruiters see when they review your candidate details.
            </p>
          </div>
          <Button to={profileRoute} className="candidate-profile-edit-button">
            <span className="material-symbols-outlined">edit</span>
            Edit profile
          </Button>
        </aside>
      </section>
    </div>
  )
}

type ContactItemProps = {
  icon: string
  label: string
  value: string
}

function ContactItem({ icon, label, value }: ContactItemProps) {
  if (!value) {
    return null
  }

  return (
    <div className="candidate-profile-contact-item">
      <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

function buildSummary(candidate: CandidateProfileData) {
  const skills = candidate.skills.slice(0, 3).join(', ')

  if (skills) {
    return `Candidate profile focused on ${skills}.`
  }

  return 'Candidate profile ready for recruiter review.'
}

function formatLabel(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'ME'
}

function getVisibleList(list: string[], fallback: string[]) {
  return list.length > 0 ? list : fallback
}

export default CandidateProfile
