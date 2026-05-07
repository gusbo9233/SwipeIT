import React, { useEffect, useMemo, useState } from 'react';
import type { Candidate } from '../../types/Candidate';
import { useSearchContext } from '../../context/SearchContext';
import { loadSwipeCandidates } from '../../data/profileStorage';
import Button from '../Button';
import SwipeDeck from './SwipeDeck';

interface SwipeViewProps {
  onBack: () => void;
}

const SwipeView: React.FC<SwipeViewProps> = ({ onBack }) => {
  const { selectedSkills } = useSearchContext();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSwipeCandidates()
      .then(setCandidates)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Could not load candidates.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredDeck = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSkills = selectedSkills.length === 0 ||
        candidate.skills.some(skill => selectedSkills.includes(skill));
      return matchesSkills;
    });
  }, [selectedSkills, candidates]);

  const searchKey = selectedSkills.join(',');

  return (
    <div className="swipe-view">
      <Button variant="transparent" onClick={onBack}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          arrow_back
        </span>
        BACK TO SEARCH SETTINGS
      </Button>
      <div className="swipe-stack-container">
        {loading ? (
          <p>Loading candidates...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <SwipeDeck
            key={searchKey}
            candidates={filteredDeck}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
};

export default SwipeView;
