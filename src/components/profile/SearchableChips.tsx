import { useState, type KeyboardEvent } from 'react'

type SearchableChipsProps = {
  accentClassName?: string
  onChange?: (items: string[]) => void
  selected: string[]
  suggested: string[]
}

function SearchableChips({
  accentClassName = '',
  onChange,
  selected,
  suggested,
}: SearchableChipsProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedItems, setSelectedItems] = useState(selected)

  const availableSuggestions = suggested.filter(
    (item) => !selectedItems.some((selectedItem) => isSameItem(selectedItem, item)),
  )

  function addItem(item: string) {
    const nextItem = item.trim()
    if (!nextItem) return
    if (selectedItems.some((current) => isSameItem(current, nextItem))) return

    const nextItems = [...selectedItems, nextItem]
    setSelectedItems(nextItems)
    onChange?.(nextItems)
    setInputValue('')
  }

  function removeItem(item: string) {
    const nextItems = selectedItems.filter((current) => !isSameItem(current, item))
    setSelectedItems(nextItems)
    onChange?.(nextItems)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()
    addItem(inputValue)
  }

  return (
    <>
      <label className="skill-search">
        <span className="material-symbols-outlined">search</span>
        <input
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          value={inputValue}
        />
      </label>
      <div className="candidate-chip-list">
        {selectedItems.map((item) => (
          <button
            aria-label={`Remove ${item}`}
            className={`skill-chip is-selected ${accentClassName}`.trim()}
            key={item}
            onClick={() => removeItem(item)}
            type="button"
          >
            <span>{item}</span>
            <span className="material-symbols-outlined">close</span>
          </button>
        ))}
        {availableSuggestions.map((item) => (
          <button
            aria-label={`Add ${item}`}
            className="skill-chip"
            key={item}
            onClick={() => addItem(item)}
            type="button"
          >
            <span className="material-symbols-outlined">add</span>
            <span>{item}</span>
          </button>
        ))}
      </div>
    </>
  )
}

function isSameItem(firstItem: string, secondItem: string) {
  return firstItem.trim().toLowerCase() === secondItem.trim().toLowerCase()
}

export default SearchableChips
