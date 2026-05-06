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

  const addSkill = (skill: string) => {
  if (selectedSkills.some((s) => s.toLowerCase() === skill.toLowerCase())) return
  setSelectedSkills((prev) => [...prev, skill])
  setInputValue('')
  }
  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill))
  }

  const toggleExperience = (level: ExperienceKey) => {
    setExperienceLevels((prev) => ({ ...prev, [level]: !prev[level] }))
  }

  const value: SearchContextType = {
    inputValue,
    setInputValue,
    selectedSkills,
    setSelectedSkills,
    experienceLevels,
    setExperienceLevels,
    workEnv,
    setWorkEnv,
    addSkill,
    removeSkill,
    toggleExperience
  }


  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
