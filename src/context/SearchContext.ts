import { createContext, useContext } from 'react'
import type { ExperienceKey, WorkEnv } from '../types/searchFilter'

export type SearchContextType = {
  inputValue: string
  setInputValue: (value: string) => void
  selectedSkills: string[]
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>
  workEnv: WorkEnv
  setWorkEnv: React.Dispatch<React.SetStateAction<WorkEnv>>
  experienceLevels: Record<ExperienceKey, boolean>
  setExperienceLevels: React.Dispatch<React.SetStateAction<Record<ExperienceKey, boolean>>>
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  toggleExperience: (experience: ExperienceKey) => void
}

export const SearchContext = createContext<SearchContextType | null>(null)

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider')
  }
  return context
}
