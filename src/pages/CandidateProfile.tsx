import Button from '../components/Button'
import CandidateCard from '../components/CandidateCard'
import { useAuth } from '../context/AuthProvider'
import {
  getProfileForUser,
  getStoredProfile,
} from '../data/profileStorage'
import candidatesData from '../data/Candidates.json'
import type { Candidate } from '../types/Candidate'
import type { CandidateProfileData, UserProfile } from '../types/Profile'
import { profileRoute } from './Profile'
import './Profile.css'

export const candidateProfileRoute = '/candidate-profile'

const candidates = candidatesData as Candidate[]
const fallbackImageUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'

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
  const skills = getVisibleList(candidate.skills, ['React', 'TypeScript', 'Node.js'])
  const workPreferences = getVisibleList(candidate.workPreferences, ['Open to opportunities'])
  const previewCandidate = {
    id: user?.id ?? profile.email ?? 'candidate-profile-preview',
    imageUrl: getCandidateImageUrl(profile, displayName),
    name: displayName,
    skills,
  }

  return (
    <div className="candidate-profile-view page">
      <section className="candidate-profile-preview" aria-label="Recruiter profile preview">
        <div className="candidate-profile-card-preview">
          <p className="candidate-profile-kicker">Recruiter preview</p>
          <CandidateCard
            candidate={previewCandidate}
            onDislike={() => undefined}
            onLike={() => undefined}
            onViewResume={() => undefined}
          />
        </div>

        <div className="candidate-profile-card">
          <div className="candidate-profile-body">
            <section className="candidate-profile-section" aria-labelledby="candidate-summary-title">
              <h1 id="candidate-summary-title">{displayName}</h1>
              <p className="candidate-profile-summary">
                {buildSummary(candidate)}
              </p>
            </section>

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

function getVisibleList(list: string[], fallback: string[]) {
  return list.length > 0 ? list : fallback
}

function getCandidateImageUrl(profile: UserProfile, displayName: string) {
  const matchingCandidate = candidates.find((candidate) => {
    return (
      candidate.email.toLowerCase() === profile.email.toLowerCase() ||
      candidate.name.toLowerCase() === displayName.toLowerCase()
    )
  })

  return matchingCandidate?.imageUrl ?? fallbackImageUrl
}

export default CandidateProfile
