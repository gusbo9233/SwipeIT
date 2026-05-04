type IconInputProps = {
  icon: string
  name?: string
  onChange?: (value: string) => void
  type?: 'email' | 'tel' | 'text' | 'url'
  value?: string
}

function IconInput({
  icon,
  name,
  onChange,
  type = 'url',
  value,
}: IconInputProps) {
  return (
    <label className="candidate-icon-input">
      <span className="candidate-input-icon material-symbols-outlined">{icon}</span>
      <input
        name={name}
        onChange={(event) => onChange?.(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  )
}

export default IconInput
