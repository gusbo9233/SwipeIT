type IconInputProps = {
  icon: string
  placeholder: string
  type?: 'email' | 'url'
  name?: string
}

function IconInput({ icon, placeholder, type = 'url', name }: IconInputProps) {
  return (
    <label className="candidate-icon-input">
      <span className="candidate-input-icon material-symbols-outlined">{icon}</span>
      <input name={name} placeholder={placeholder} type={type} />
    </label>
  )
}

export default IconInput
