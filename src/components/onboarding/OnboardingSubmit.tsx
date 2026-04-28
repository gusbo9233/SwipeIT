type OnboardingSubmitProps = {
  helperText: string
  label: string
  tone?: 'candidate' | 'recruiter'
}

function OnboardingSubmit({
  helperText,
  label,
  tone = 'candidate',
}: OnboardingSubmitProps) {
  return (
    <div className="candidate-submit-block">
      <button className={`candidate-submit ${tone}-submit`} type="submit">
        <span>{label}</span>
        <span className="material-symbols-outlined">check_circle</span>
      </button>
      <p>{helperText}</p>
    </div>
  )
}

export default OnboardingSubmit
