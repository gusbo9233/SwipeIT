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

    if (!nextItem) {
      return
    }

    setSelectedItems((currentItems) => {
      if (currentItems.some((currentItem) => isSameItem(currentItem, nextItem))) {
        return currentItems
      }

      const nextItems = [...currentItems, nextItem]
      onChange?.(nextItems)
      return nextItems
    })
    setInputValue('')
  }

  function removeItem(item: string) {
    setSelectedItems((currentItems) => {
      const nextItems = currentItems.filter((currentItem) => !isSameItem(currentItem, item))
      onChange?.(nextItems)
      return nextItems
    })
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
