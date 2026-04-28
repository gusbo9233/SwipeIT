type IconInputProps = {
  icon: string
  placeholder: string
  type?: 'email' | 'url'
}

function IconInput({ icon, placeholder, type = 'url' }: IconInputProps) {
  return (
    <label className="candidate-icon-input">
      <span className="candidate-input-icon material-symbols-outlined">{icon}</span>
      <input placeholder={placeholder} type={type} />
    </label>
  )
}

export default IconInput
