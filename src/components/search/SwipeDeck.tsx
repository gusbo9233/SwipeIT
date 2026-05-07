import { useState } from "react";
import type { Candidate, CandidatePreview } from "../../types/Candidate";
import Button from "../Button";
import CandidateCard from "../CandidateCard";
import SwipeCard from "./SwipeCard";

type SwipeDeckProps = {
    candidates: Candidate[]
    onBack: () => void
}

// This component manages the index internally
const SwipeDeck = ({ candidates, onBack } : SwipeDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Automatically resets to 0 when key changes
  const currentCandidate = candidates[currentIndex];
  const handleNext = () => setCurrentIndex(prev => prev + 1);
  const nextCandidate = candidates[currentIndex + 1];
  const backCandidate = candidates[currentIndex + 2];
  const nextPreviewData: CandidatePreview | null = nextCandidate
    ? {
        id: nextCandidate.id,
        name: nextCandidate.name,
        imageUrl: nextCandidate.imageUrl,
        skills: nextCandidate.skills
      }
    : null;
  const backPreviewData: CandidatePreview | null = backCandidate
    ? {
        id: backCandidate.id,
        name: backCandidate.name,
        imageUrl: backCandidate.imageUrl,
        skills: backCandidate.skills
      }
    : null;

  if (!currentCandidate) {
    return (
      <div className="empty-stack-state">
        <span className="material-symbols-outlined empty-stack-state__icon" aria-hidden="true">
          task_alt
        </span>
        <p className="empty-stack-state__eyebrow">Deck complete</p>
        <h3>You reviewed every match in this set.</h3>
        <p className="empty-stack-state__copy">
          Adjust your filters to widen the pool or start a more focused pass.
        </p>
        <Button onClick={onBack}>
          Update Filters
          <span className="material-symbols-outlined">tune</span>
        </Button>
      </div>
    );
  }

    const previewData: CandidatePreview = {
        id: currentCandidate.id,
        name: currentCandidate.name,
        imageUrl: currentCandidate.imageUrl,
        skills: currentCandidate.skills
    };

    return (
      <div className="swipe-deck">
        <div className="swipe-deck__stage">
          {backPreviewData ? (
            <div className="swipe-deck__preview-card swipe-deck__preview-card--back" aria-hidden="true">
              <CandidateCard
                candidate={backPreviewData}
                onDislike={() => undefined}
                onLike={() => undefined}
              />
            </div>
          ) : null}
          {nextPreviewData ? (
            <div className="swipe-deck__preview-card" aria-hidden="true">
              <CandidateCard
                candidate={nextPreviewData}
                onDislike={() => undefined}
                onLike={() => undefined}
              />
            </div>
          ) : null}
          <SwipeCard
            key={previewData.id}
            candidate={previewData}
            onLike={handleNext}
            onDislike={handleNext}
            onSuperLike={handleNext}
          />
        </div>
        <div className="swipe-deck__hint" aria-hidden="true">
          <span>
            <span className="material-symbols-outlined">swipe_left</span>
            Pass
          </span>
          <span>
            <span className="material-symbols-outlined">swipe_right</span>
            Like
          </span>
        </div>
      </div>
    );
};

export default SwipeDeck;
