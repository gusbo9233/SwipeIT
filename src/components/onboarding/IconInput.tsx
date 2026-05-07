type IconInputProps = {
  icon: string
  placeholder: string
  type?: 'email' | 'url'
  name: string // <-- Lägg till denna rad!
}

// Lägg till name i listan över argument här under
function IconInput({ icon, placeholder, type = 'url', name }: IconInputProps) {
  return (
    <label className="candidate-icon-input">
      <span className="candidate-input-icon material-symbols-outlined">{icon}</span>
      {/* Glöm inte att lägga till name={name} på input-taggen också! */}
      <input name={name} placeholder={placeholder} type={type} />
    </label>
  )
}

export default IconInput