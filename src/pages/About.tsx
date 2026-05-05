import './About.css'

function About() {
  return (
    <main className="about-page page">
      <section className="page-hero">
        <h1>About Swipe IT</h1>
        <p>
          A recruiter-first hiring platform for IT professionals, built to surface
          strong talent with a clean swipe experience inspired by modern match flows.
        </p>
      </section>

      <section className="about-grid">
        <article>
          <h2>Recruiters in control</h2>
          <p>
            Candidates are discovered on your terms. Swipe through curated profiles,
            then move quickly from interest to conversation without a crowded marketplace.
          </p>
        </article>

        <article>
          <h2>Swipe-inspired talent discovery</h2>
          <p>
            The interface is simple, intuitive and fast — recruiters swipe to express
            interest, while candidate profiles stay focused on skills, experience and fit.
          </p>
        </article>

        <article>
          <h2>IT-focused matching</h2>
          <p>
            Designed for engineers, product specialists and technical teams, Swipe IT
            connects recruiters with candidates who bring strong stacks, real-world
            experience and a clear culture fit.
          </p>
        </article>
      </section>

      <section className="about-details">
        <h2>How we think about code and design</h2>
        <p>
          The product is built with a modern frontend stack and a component-driven
          approach. Clean data contracts, typed interfaces and reusable UI patterns
          keep the experience consistent and easy to iterate on.
        </p>
        <ul>
          <li>React + TypeScript for reliable, maintainable UI</li>
          <li>Vite-powered developer experience with fast feedback</li>
          <li>Reusable components and clear page structure</li>
          <li>Recruiter-first interaction model for better hiring outcomes</li>
        </ul>
      </section>

      <section className="about-footer">
        <h2>Built for modern recruitment teams</h2>
        <p>
          Swipe IT helps hiring teams move faster with a polished candidate discovery
          workflow that feels familiar, yet stays focused on the needs of recruiters
          and technical hiring managers.
        </p>
      </section>
    </main>
  )
}

export default About;
