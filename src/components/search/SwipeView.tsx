import React, { useMemo } from 'react';
import candidateData from '../../data/Candidates.json';
import type { Candidate } from '../../types/Candidate';
import { useSearchContext } from '../../context/SearchContext';
import Button from '../Button';
import SwipeDeck from './SwipeDeck';

interface SwipeViewProps {
  onBack: () => void;
}

const SwipeView: React.FC<SwipeViewProps> = ({ onBack }) => {
  const { selectedSkills } = useSearchContext();

  const candidates = candidateData as Candidate[];

  const filteredDeck = useMemo(() => {
    return candidates.filter(candidate => {
      // 1. Skill Match
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
        {/* Whenever searchKey changes, SwipeDeck is destroyed and recreated */}
        <SwipeDeck 
          key={searchKey} 
          candidates={filteredDeck} 
          onBack={onBack} 
        />
      </div>
    </div>
  );
};

export default SwipeView;