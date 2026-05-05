import { useMemo, useState } from 'react'
import candidateData from '../../data/Candidates.json'
import type { Candidate } from '../../types/Candidate'
import { useSearchContext } from '../../context/SearchContext'
import type { ExperienceKey } from '../../types/searchFilter'
import Button from '../Button'
import SwipeCard from '../SwipeCard'

interface SwipeViewProps {
  onBack: () => void
}

const candidates = candidateData as Candidate[]
const currentYear = new Date().getFullYear()

function getExperienceLevel(yearsSinceGrad: number): ExperienceKey {
  if (yearsSinceGrad <= 2) return 'junior'
  if (yearsSinceGrad <= 5) return 'mid'
  if (yearsSinceGrad <= 10) return 'senior'
  return 'expert'
}

function SwipeView({ onBack }: SwipeViewProps) {
  const { selectedSkills, experienceLevels } = useSearchContext()
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredDeck = useMemo(() => {
    const activeLevels = Object.entries(experienceLevels)
      .filter(([, isActive]) => isActive)
      .map(([level]) => level)

    return candidates.filter((candidate) => {
      const matchesSkills =
        selectedSkills.length === 0 ||
        candidate.skills.some((skill) => selectedSkills.includes(skill))

      const educationYears = candidate.education.map((e) => e.year)
      const latestYear = educationYears.length > 0 ? Math.max(...educationYears) : null
      const candidateLevel = latestYear ? getExperienceLevel(currentYear - latestYear) : null

      const matchesExperience =
        activeLevels.length === 0 ||
        (candidateLevel !== null && activeLevels.includes(candidateLevel))

      return matchesSkills && matchesExperience
    })
  }, [selectedSkills, experienceLevels])

  const currentCandidate = filteredDeck[currentIndex]

  const handleNext = () => setCurrentIndex((prev) => prev + 1)

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
            key={currentCandidate.id}
            candidate={currentCandidate}
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
  )
}

export default SwipeView
