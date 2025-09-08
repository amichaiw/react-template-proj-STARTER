const { NavLink } = ReactRouterDOM


export function AppHeader() {

    return (
        // <header className="app-header full main-layout">
        <header className="app-header full">
            <section className="header-container">
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Book">Books</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    )
}
