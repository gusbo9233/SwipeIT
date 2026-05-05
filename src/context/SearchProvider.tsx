import { useState } from 'react'
import type { ReactNode } from 'react'
import type { ExperienceKey, WorkEnv } from '../types/searchFilter'
import { SearchContext, type SearchContextType } from './SearchContext'

export function SearchProvider({
  children,
}: {
  children: ReactNode
}) {
  const [inputValue, setInputValue] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [experienceLevels, setExperienceLevels] = useState<Record<ExperienceKey, boolean>>({
    junior: false,
    mid: true,
    senior: false,
    expert: false,
  })
  const [workEnv, setWorkEnv] = useState<WorkEnv>('remote')

  const value: SearchContextType = {
    inputValue,
    setInputValue,
    selectedSkills,
    setSelectedSkills,
    experienceLevels,
    setExperienceLevels,
    workEnv,
    setWorkEnv,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
