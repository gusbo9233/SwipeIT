import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { ExperienceKey, WorkEnv } from '../types/searchFilter'

export type SearchContextType = {
  inputValue: string
  setInputValue: (value: string) => void
  selectedSkills: string[]
  setSelectedSkills: Dispatch<SetStateAction<string[]>>
  workEnv: WorkEnv
  setWorkEnv: Dispatch<SetStateAction<WorkEnv>>
  experienceLevels: Record<ExperienceKey, boolean>
  setExperienceLevels: Dispatch<SetStateAction<Record<ExperienceKey, boolean>>>
}

export const SearchContext = createContext<SearchContextType | null>(null)

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider')
  }
  return context
}
