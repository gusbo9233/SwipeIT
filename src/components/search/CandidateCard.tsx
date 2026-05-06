import type { CandidatePreview } from '../../types/Candidate';
import './CandidateCard.css';
import { useState } from "react";

interface CandidateCardProps {
  candidate: CandidatePreview;
  onLike: () => void;
  onDislike: () => void;
  onViewResume?: (candidateId: string | number) => void;
}

function CandidateCard({ candidate, onLike, onDislike, onViewResume }: CandidateCardProps) {
  // 1. Use the candidate.id as part of the state key if needed, 
  // or simply rely on the 'key' prop from the parent.
  const [loadingId, setLoadingId] = useState<string | number | null>(null);

  // 2. Logic: If the current candidate.id isn't the one we are "tracking", 
  // it means we just got a new candidate.
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
          alt={candidate.name} 
          onLoad={handleImageLoad}
          onError={handleImageLoad} // Stop loading even on error
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />

        {/* 3. Spinner logic based on the ID mismatch */}
        {candidate.imageUrl && isImageLoading && (
          <div className="candidate-card__spinner" role="status" aria-label="Loading image">
            <span className="candidate-card__spinner-dot" />
          </div>
        )}

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
            className="candidate-card__view-resume"
            type="button"
            aria-label={`View full resume for ${candidate.name}`}
            onClick={() => onViewResume?.(candidate.id)}
            disabled={!onViewResume}
          >
            <span>View Full Resume</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="candidate-card__actions" role="group" aria-label="Candidate actions">
        <button
          className="candidate-card__action candidate-card__action--dislike"
          onClick={onDislike}
          type="button"
          aria-label="Dislike candidate"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <button
          className="candidate-card__action candidate-card__action--like"
          onClick={onLike}
          type="button"
          aria-label="Like candidate"
        >
          <span className="material-symbols-outlined">star</span>
        </button>
      </div>
    </article>
  );
}

export default CandidateCard;