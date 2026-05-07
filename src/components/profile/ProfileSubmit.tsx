import Button from '../Button'

type ProfileSubmitProps = {
  helperText: string
  label: string
  tone?: 'candidate' | 'recruiter'
}

function ProfileSubmit({
  helperText,
  label,
  tone = 'candidate',
}: ProfileSubmitProps) {
  return (
    <div className="candidate-submit-block">
      <Button className={`candidate-submit ${tone}-submit`} type="submit">
        <span>{label}</span>
        <span className="material-symbols-outlined">check_circle</span>
      </Button>
      <p>{helperText}</p>
    </div>
  )
}

export default ProfileSubmit
