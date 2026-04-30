import Chip from "../Chip";

type SearchProps = {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    filteredSkills: string[];
    addSkill: (value: string) => void;
    removeSkill: (value: string) => void;
    selectedSkills: string[];
}

function SearchView(props: SearchProps) {
    const {inputValue, setInputValue, handleKeyDown, filteredSkills, addSkill, removeSkill, selectedSkills} = props;
    return (
    <div className="search-page page">
        <header className="search-hero">
          <h1>Refine Search</h1>
          <p>Define your ideal IT professional candidate.</p>
        </header>

        <section className="search-section">
          <div className="skill-search-wrapper">
            <div className="skill-search">
              <span className="material-symbols-outlined">search</span>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by skill..."
                type="text"
                value={inputValue}
                />
            </div>
            {filteredSkills.length > 0 && (
              <div className="skill-dropdown is-visible">
                {filteredSkills.map((skill) => (
                  <button
                  key={skill}
                  className="skill-dropdown-item"
                  onClick={() => addSkill(skill)}
                  type="button"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedSkills.length > 0 && (
            <div className="selected-chips candidate-chip-list">
              {selectedSkills.map((skill) => (
                <Chip key={skill} onClick={() => removeSkill(skill)}>
                  {skill}
                </Chip>
              ))}
            </div>
          )}
        </section>

        <section className="search-section">
          <div className="search-experience-environment-wrapper">
            <div className="search-experience">
          <div className="search-section-title">
            <span className="material-symbols-outlined">analytics</span>
            <h2>Experience Level</h2>
          </div>
          <div className="experience-grid">
            {EXPERIENCE_OPTIONS.map(({ key, label, range }) => (
              <label
                className={`experience-option${experienceLevels[key] ? ' is-selected' : ''}`}
                key={key}
              >
                <input
                  checked={experienceLevels[key]}
                  onChange={() => toggleExperience(key)}
                  type="checkbox"
                />
                <span>
                  <strong>{label}</strong>
                  <small>{range}</small>
                </span>
              </label>
            ))}
          </div>
          </div>

          <div className="search-environment">
          <div className="search-section-title">
            <span className="material-symbols-outlined">distance</span>
            <h2>Work Environment</h2>
          </div>
          <div className="work-preference-grid">
            {WORK_ENV_OPTIONS.map(({ value, icon, label }) => (
              <button
                className={`work-preference${workEnv === value ? ' is-selected' : ''}`}
                key={value}
                onClick={() => setWorkEnv(value)}
                type="button"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: workEnv === value ? "'FILL' 1" : undefined }}
                >
                  {icon}
                </span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>
          </div>
          </div>
        </section>

      <div className="fixed-bottom">
        <button className="start-swiping-btn" type="button">
          Start Swiping
          <span className="material-symbols-outlined">bolt</span>
        </button>
      </div>
    </div>
  )
}

export default SearchView;