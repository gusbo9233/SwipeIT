import Button from '../Button'

type PreferenceOption = {
  label: string
  value: string
}

type PreferencesSetupProps = {
  description: string
  onBack: () => void
  options: PreferenceOption[]
  title: string
}

function PreferencesSetup({
  description,
  onBack,
  options,
  title,
}: PreferencesSetupProps) {
  return (
    <form className="register-card preferences-card">
      <div className="register-card-header">
        <p className="eyebrow">Preferences</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="preference-list">
        {options.map((option) => (
          <label className="preference-option" key={option.value}>
            <input name={option.value} type="checkbox" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      <div className="step-actions">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Finish setup</Button>
      </div>
    </form>
  )
}

export default PreferencesSetup
