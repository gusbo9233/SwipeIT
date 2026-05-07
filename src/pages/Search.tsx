import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Search.css';
import SearchView from '../components/search/SearchView';
import SwipeView from '../components/search/SwipeView';

export const searchRoute = '/search';

type ViewState = 'filter' | 'swiping';

// Simple fade variants for better UX
const fadeVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
};

function Search() {
  const [view, setView] = useState<ViewState>('filter');

  // Smooth scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="search-view-container page">
      {/* "wait" mode ensures views don't jump or overlap */}
      <AnimatePresence mode="wait">
        {view === 'filter' ? (
          <div className="view-wrapper">
            <motion.div
              key="filter"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <SearchView onStart={() => setView('swiping')} />
            </motion.div>
          </div>
        ) : (
          <div className="view-wrapper">
            <motion.div
              key="swiping"
              variants={fadeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <SwipeView onBack={() => setView('filter')} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;
