import skills from '../data/Skills.json'
import './Search.css'
import SearchView from '../components/search/SearchView'
import { SearchProvider } from '../context/SearchContext'

function Search() {
  return (
    <div>
      <section>
        <SearchProvider skillsList={skills}>
          <SearchView />
        </SearchProvider>
      </section>
    </div>
  )
}

export default Search
