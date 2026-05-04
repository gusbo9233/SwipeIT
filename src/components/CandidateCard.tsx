import './CandidateCard.css';
import { useState, useEffect } from "react";

interface Candidate {
  id: string | number;
  name: string;
  imageUrl: string;
  skills: string[];
}

interface CandidateCardProps {
  candidate: Candidate;
  onLike: () => void;
  onDislike: () => void;
  onSuperLike?: () => void; // Optional prop
}

function CandidateCard({ candidate, onLike, onDislike, onSuperLike }: CandidateCardProps) {
  
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => {
    setLoading(false);
  };

  const [imgKey, setImgKey] = useState(0);
  useEffect(() => {
    setImgKey(k => k + 1);
  }, [candidate]); // change later to [candidate.id]


  return (
    <article className="candidate-card" aria-label={`Candidate: ${candidate.name}`}>
      <div className="candidate-card__image-wrapper">
        {/* Candidate's image or fetch AI-generated face using imgKey to force new */}
        <img
          src={
            candidate.imageUrl && candidate.imageUrl.length > 0
              ? candidate.imageUrl
              : `https://thispersondoesnotexist.com/image?${imgKey}`
          }
          alt={`${candidate.name} profile photo`}
          className="candidate-card__image"
          onLoad={handleImageLoad}
          onError={handleImageError}
          aria-busy={loading}
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
export type { Candidate, CandidateCardProps };
