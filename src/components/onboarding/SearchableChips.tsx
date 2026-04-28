type SearchableChipsProps = {
  accentClassName?: string
  placeholder: string
  selected: string[]
  suggested: string[]
}

function SearchableChips({
  accentClassName = '',
  placeholder,
  selected,
  suggested,
}: SearchableChipsProps) {
  return (
    <>
      <label className="skill-search">
        <span className="material-symbols-outlined">search</span>
        <input placeholder={placeholder} type="text" />
      </label>
      <div className="candidate-chip-list">
        {selected.map((item) => (
          <button
            className={`skill-chip is-selected ${accentClassName}`.trim()}
            key={item}
            type="button"
          >
            <span>{item}</span>
            <span className="material-symbols-outlined">close</span>
          </button>
        ))}
        {suggested.map((item) => (
          <button className="skill-chip" key={item} type="button">
            <span className="material-symbols-outlined">add</span>
            <span>{item}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default SearchableChips
