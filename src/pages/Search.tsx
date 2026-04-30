import './Search.css'
import SearchView from '../components/search/SearchView'
import { SearchProvider } from '../context/SearchProvider';
import SwipeCandidates from '../components/search/SwipeCandidate';

function Search() {
  function onStartSwiping() {
    // slide to secetion for SwipeCandidates.tsx
  }

  const searchProps = {onStartSwiping};

  return (
    <SearchProvider>
      <div className="search-page page">
        <SearchView {...searchProps}/>
        <SwipeCandidates />
      </div>
    </SearchProvider>
  )
}

export default Search
