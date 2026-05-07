import { useState } from 'react'
import type { CandidatePreview } from '../types/Candidate'
import './CandidateCard.css'

type CandidateCardProps = {
  candidate: CandidatePreview
  onDislike: () => void
  onLike: () => void
  onSuperLike?: () => void
  onViewResume?: (candidateId: string | number) => void
}

function CandidateCard({
  candidate,
  onDislike,
  onLike,
  onViewResume,
}: CandidateCardProps) {
  const [loadedImageId, setLoadedImageId] = useState<string | number | null>(null)
  const imageSource =
    candidate.imageUrl && candidate.imageUrl.length > 0
      ? candidate.imageUrl
      : `https://thispersondoesnotexist.com/image?${candidate.id}`
  const isImageLoading = loadedImageId !== candidate.id

  function handleImageDone() {
    setLoadedImageId(candidate.id)
  }

  return (
    <article className="candidate-card" aria-label={`Candidate: ${candidate.name}`}>
      <div className="candidate-card__image-wrapper">
        <img
          alt={`${candidate.name} profile photo`}
          className="candidate-card__image"
          key={imageSource}
          onError={handleImageDone}
          onLoad={handleImageDone}
          src={imageSource}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />

        {isImageLoading ? (
          <div className="candidate-card__spinner" role="status" aria-label="Loading image">
            <span className="candidate-card__spinner-dot" />
          </div>
        ) : null}

        <div className="candidate-card__gradient-overlay" aria-hidden="true" />
        <div className="candidate-card__overlay-content">
          <h2 className="candidate-card__name">{candidate.name}</h2>
          <div className="candidate-card__skills" aria-label="Skills">
            {candidate.skills.map((skill) => (
              <span key={skill} className="candidate-card__skill-chip">
                {skill}
              </span>
            ))}
          </div>

          <button
            aria-label={`View full resume for ${candidate.name}`}
            className="candidate-card__view-resume"
            disabled={!onViewResume}
            onClick={() => onViewResume?.(candidate.id)}
            type="button"
          >
            <span>View Full Resume</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="candidate-card__actions" role="group" aria-label="Candidate actions">
        <button
          aria-label="Dislike candidate"
          className="candidate-card__action candidate-card__action--dislike"
          onClick={onDislike}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <button
          aria-label="Like candidate"
          className="candidate-card__action candidate-card__action--like"
          onClick={onLike}
          type="button"
        >
          <span className="material-symbols-outlined">star</span>
        </button>
      </div>
    </article>
  )
}

export default CandidateCard
export type { CandidateCardProps }
