import type { CandidatePreview } from '../types/Candidate';
import './CandidateCard.css';
import { useState } from "react";

interface CandidateCardProps {
  candidate: CandidatePreview;
  onLike: () => void;
  onDislike: () => void;
  onSuperLike?: () => void; // Optional prop
}

function CandidateCard({ candidate, onLike, onDislike, onSuperLike }: CandidateCardProps) {
  
  const [loading, setLoading] = useState(true);

  return (
    <article className="candidate-card" aria-label={`Candidate: ${candidate.name}`}>
      <div className="candidate-card__image-wrapper">
        <img 
          key={candidate.id} 
          src={candidate.imageUrl}
          alt={candidate.name} 
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }}
        />
        {/* Spinner when loading image */}
        {loading && (
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
          {/* View Full Resume button under skills */}
          <button
            className="candidate-card__view-resume"
            type="button"
            aria-label={`View full resume for ${candidate.name}`}
            onClick={() => {/* Open modal or navigate to resume */}}
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
          className="candidate-card__action candidate-card__action--superlike"
          onClick={onSuperLike}
          type="button"
          aria-label="Save candidate"
          disabled={!onSuperLike}
        >
          <span className="material-symbols-outlined">star_border</span>
        </button>

        <button
          className="candidate-card__action candidate-card__action--like"
          onClick={onLike}
          type="button"
          aria-label="Like candidate"
        >
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
    </article>
  );
}

export default CandidateCard;
export type { CandidateCardProps };