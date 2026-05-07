import React, { useMemo } from 'react';
import candidateData from '../../data/Candidates.json';
import type { Candidate } from '../../types/Candidate';
import { useSearchContext } from '../../context/SearchContext';
import Button from '../Button';
import SwipeDeck from './SwipeDeck';
import './SwipeView.css'

interface SwipeViewProps {
  onBack: () => void;
}

const SwipeView: React.FC<SwipeViewProps> = ({ onBack }) => {
  const { selectedSkills } = useSearchContext();

  const candidates = candidateData as Candidate[];

  const filteredDeck = useMemo(() => {
    // filtering by skills, add for experienceLevels later
    return candidates.filter(candidate => {
      const matchesSkills = selectedSkills.length === 0 || 
        candidate.skills.some(skill => selectedSkills.includes(skill));
      return matchesSkills;
    });
  }, [selectedSkills, candidates]);

  const searchKey = selectedSkills.join(',');
  return (
    <div className="swipe-view">
      <div className="swipe-view__topbar">
        <Button className="swipe-view__back" variant="transparent" onClick={onBack}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            arrow_back
          </span>
          Filters
        </Button>
      </div>

      <header className="swipe-view__hero">
        <p className="swipe-view__eyebrow">Candidate deck</p>
        {selectedSkills.length > 0 ? (
          <div className="swipe-view__filters" aria-label="Active skill filters">
            {selectedSkills.slice(0, 4).map((skill) => (
              <span className="swipe-view__filter-chip" key={skill}>
                {skill}
              </span>
            ))}
            {selectedSkills.length > 4 ? (
              <span className="swipe-view__filter-chip">+{selectedSkills.length - 4}</span>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="swipe-stack-container">
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
