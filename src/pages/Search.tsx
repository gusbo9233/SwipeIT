import './Search.css'
import SearchView from '../components/search/SearchView'
import { SearchProvider } from '../context/SearchProvider';

function Search() {
  function onStartSwiping() {
    // slide to secetion for SwipeCandidates.tsx
  }

  const searchProps = { onStartSwiping};

  return (
    <SearchProvider>
      <section>
        <SearchView {...searchProps}/>
      </section>

      <section className="swipe-candidates">
        
      </section>
    </SearchProvider>
  )
}

export default Search
