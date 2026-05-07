type PreferenceItem = {
  checked?: boolean
  icon: string
  label: string
  value: string
}

type PreferenceGridProps = {
  itemClassName?: string
  items: PreferenceItem[]
  onChange?: (values: string[]) => void
  selectedValues?: string[]
}

function PreferenceGrid({
  itemClassName = '',
  items,
  onChange,
  selectedValues,
}: PreferenceGridProps) {
  const checkedValues = selectedValues ?? items.filter((item) => item.checked).map((item) => item.value)

  function toggleValue(value: string, checked: boolean) {
    const nextValues = checked
      ? [...checkedValues, value]
      : checkedValues.filter((selectedValue) => selectedValue !== value)

    onChange?.([...new Set(nextValues)])
  }

  return (
    <div className="work-preference-grid">
      {items.map((item) => (
        <label
          className={`work-preference ${itemClassName}`.trim()}
          key={item.value}
        >
          <input
            checked={checkedValues.includes(item.value)}
            name={item.value}
            onChange={(event) => toggleValue(item.value, event.target.checked)}
            type="checkbox"
          />
          <span className="material-symbols-outlined">{item.icon}</span>
          <strong>{item.label}</strong>
        </label>
      ))}
    </div>
  )
}

export default PreferenceGrid
