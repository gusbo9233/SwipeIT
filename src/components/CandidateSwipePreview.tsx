type CandidateMetric = {
  label: string
  value: string
}

type CandidateSwipePreviewProps = {
  candidate: {
    initials: string
    label: string
    name: string
    role: string
    summary: string
    metrics: CandidateMetric[]
    skills: string[]
  }
}

function CandidateSwipePreview({ candidate }: CandidateSwipePreviewProps) {
  return (
    <div className="hero-panel" aria-label="Candidate swipe preview">
      <div className="swipe-card card-one" />
      <div className="swipe-card card-two" />
      <article className="swipe-card candidate-preview">
        <div className="candidate-header">
          <div className="candidate-avatar">{candidate.initials}</div>
          <div>
            <p className="candidate-label">{candidate.label}</p>
            <h2>{candidate.name}</h2>
            <p>{candidate.role}</p>
          </div>
        </div>

        <div className="candidate-meta">
          {candidate.metrics.map((metric) => (
            <span key={metric.label}>
              <strong>{metric.value}</strong>
              {metric.label}
            </span>
          ))}
        </div>

        <p className="candidate-summary">{candidate.summary}</p>

        <div className="skill-list" aria-label="Candidate skills">
          {candidate.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="swipe-actions">
          <button className="swipe-action pass" type="button">
            <span className="material-symbols-outlined">close</span>
            Pass
          </button>
          <button className="swipe-action save" type="button">
            <span className="material-symbols-outlined">favorite</span>
            Like
          </button>
        </div>
      </article>
    </div>
  )
}

export default CandidateSwipePreview
