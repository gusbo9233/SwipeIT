import './NotFound.css'

function NotFound() {
    return (
        <div className="notfound-page">
            <section className="notfound-card">
                <div className="notfound-icon material-symbols-outlined">search_off</div>
                <p className="eyebrow">Page not found</p>
                <h1>404</h1>
                <p>
                    The page you are looking for does not exist or has been moved.
                </p>

                <a className="notfound-button" href="/">
                    <span>Go home</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </a>
            </section>
        </div>
    )
}

export default NotFound
