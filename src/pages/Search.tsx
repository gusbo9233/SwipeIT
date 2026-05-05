import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Search.css'
import { SearchProvider } from '../context/SearchProvider'
import SearchView from '../components/search/SearchView'
import SwipeView from '../components/search/SwipeView'

type ViewState = 'filter' | 'swiping'

const fadeVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

function Search() {
  const [view, setView] = useState<ViewState>('filter')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  return (
    <SearchProvider>
      <div className="search-view-container page">
        <AnimatePresence mode="wait">
          {view === 'filter' ? (
            <motion.div
              key="filter"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="view-wrapper"
            >
              <SearchView onStart={() => setView('swiping')} />
            </motion.div>
          ) : (
            <motion.div
              key="swiping"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="view-wrapper"
            >
              <SwipeView onBack={() => setView('filter')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SearchProvider>
  )
}

export default Search
