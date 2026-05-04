import React, { useMemo, useState } from 'react';
import candidateData from '../../data/Candidates.json';
import type { Candidate } from '../../types/Candidate';
import { useSearchContext } from '../../context/SearchContext';
import Button from '../Button';
import SwipeCard from '../SwipeCard';

interface SwipeViewProps {
  onBack: () => void;
}

const SwipeView: React.FC<SwipeViewProps> = ({ onBack }) => {
  const { selectedSkills, experienceLevels } = useSearchContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const candidates = candidateData as Candidate[];

  const filteredDeck = useMemo(() => {
    // Get array of active levels (e.g., ["Junior", "Senior"])
    const activeLevels = Object.entries(experienceLevels)
      .filter(([, isActive]) => isActive)
      .map(([level]) => level);

    return candidates.filter(candidate => {
      // 1. Skill Match
      const matchesSkills = selectedSkills.length === 0 || 
        candidate.skills.some(skill => selectedSkills.includes(skill));
      
      // 2. Experience Match Logic
      const latestYear = Math.max(...candidate.education.map(e => e.year));
      const yearsSinceGrad = 2026 - latestYear;
      const candidateLevel = yearsSinceGrad >= 5 ? 'Senior' : 'Junior';
      
      const matchesExperience = activeLevels.length === 0 || 
        activeLevels.includes(candidateLevel);

      return matchesSkills && matchesExperience;
    });
  }, [selectedSkills, experienceLevels, candidates]);

  const currentCandidate = filteredDeck[currentIndex];

  const handleNext = () => setCurrentIndex(prev => prev + 1);

  return (
    <div className="swipe-view">
      <div className="swipe-navigation">
        <Button variant="transparent" onClick={onBack}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            arrow_back
          </span>
          BACK TO SEARCH SETTINGS
        </Button>
      </div>

      <div className="swipe-stack-container">
        {currentCandidate ? (
          <SwipeCard
            key={currentCandidate.name} 
            candidate={currentCandidate as Candidate} 
            onLike={handleNext}
            onDislike={handleNext}
            onSuperLike={handleNext}
          />
        ) : (
          <div className="empty-stack-state">
            <h3>Deck Exhausted</h3>
            <p>No more candidates match your current search settings.</p>
            <Button variant="primary" onClick={onBack}>
              Update Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeView;