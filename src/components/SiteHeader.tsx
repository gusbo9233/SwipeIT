type SiteHeaderProps = {
  navItems: string[]
}

function SiteHeader({ navItems }: SiteHeaderProps) {
  return (
    <header className="top-bar">
      <a className="brand" href="#">
        <span className="brand-mark">SI</span>
        <span>Swipe IT</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href="#" key={item}>
            {item}
          </a>
        ))}
      </nav>

      <button className="mobile-menu material-symbols-outlined" type="button">
        menu
      </button>
    </header>
  )
}

export default SiteHeader
