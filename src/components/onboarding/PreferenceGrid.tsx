type PreferenceItem = {
  checked?: boolean
  icon: string
  label: string
  value: string
}

type PreferenceGridProps = {
  itemClassName?: string
  items: PreferenceItem[]
}

function PreferenceGrid({ itemClassName = '', items }: PreferenceGridProps) {
  return (
    <div className="work-preference-grid">
      {items.map((item) => (
        <label
          className={`work-preference ${itemClassName}`.trim()}
          key={item.value}
        >
          <input defaultChecked={item.checked} name={item.value} type="checkbox" />
          <span className="material-symbols-outlined">{item.icon}</span>
          <strong>{item.label}</strong>
        </label>
      ))}
    </div>
  )
}

export default PreferenceGrid
