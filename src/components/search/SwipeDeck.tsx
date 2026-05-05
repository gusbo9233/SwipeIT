import { useState } from "react";
import type { Candidate, CandidatePreview } from "../../types/Candidate";
import Button from "../Button";
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

  if (!currentCandidate) {
    return (
      <div className="empty-stack-state">
        <h3>Deck Exhausted</h3>
        <Button onClick={onBack}>Update Filters</Button>
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
        <SwipeCard
        key={previewData.id}
        candidate={previewData}
        onLike={handleNext}
        onDislike={handleNext}
        onSuperLike={handleNext}
        />
    );
};

export default SwipeDeck;