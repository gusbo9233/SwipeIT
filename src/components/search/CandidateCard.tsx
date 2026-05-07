import { useState } from "react";
import type { CandidatePreview } from '../../types/Candidate';
import './CandidateCard.css';

interface CandidateCardProps {
  candidate: CandidatePreview;
  onLike: () => void;
  onDislike: () => void;
  onViewResume?: (candidateId: string | number) => void;
}

function CandidateCard({ candidate, onLike, onDislike, onViewResume }: CandidateCardProps) {
  const [loadingId, setLoadingId] = useState<string | number | null>(null);
  const isImageLoading = loadingId !== candidate.id && Boolean(candidate.imageUrl);

  const handleImageLoad = () => {
    setLoadingId(candidate.id);
  };

  return (
    <article className="candidate-card" aria-label={`Candidate: ${candidate.name}`}>
      <div className="candidate-card__image-wrapper">
        <img
          // Keeping the key here ensures the DOM element recreates
          key={candidate.id}
          src={candidate.imageUrl}
          alt={`${candidate.name} profile photo`}
          onLoad={handleImageLoad}
          onError={handleImageLoad} // Stop loading even on error
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />

        {/* 3. Spinner logic based on the ID mismatch */}
        {
          candidate.imageUrl && isImageLoading && (
            <div className="candidate-card__spinner" role="status" aria-label="Loading image">
              <span className="candidate-card__spinner-dot" />
            </div>
          )
        }

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
            onClick={() => onViewResume?.(candidate.id)}
            disabled={!onViewResume}
            type="button"
          >
            <span>View Full Resume</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div >
      </div >

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
          disabled={!onLike}
        >
          <span className="material-symbols-outlined">star</span>
        </button>
      </div>
    </article >
  );
}

export default CandidateCard;
