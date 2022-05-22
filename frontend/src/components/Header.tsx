import "../css/Header.css"

export default function Header() {
    return (
        <header className="Header">
            <nav className="Nav">
                <img className="Header-Picture"
                     src={"https://png.pngtree.com/png-clipart/20200720/original/pngtree-g-gaming-logo-png-image_4783094.jpg"}
                     alt="logo"/>
                <ul className="nav-list">
                    <a className="Link" href="/">Home</a>
                    <a className="Link" href="/#/addgamereview">AddGameReview</a>
                </ul>
            </nav>
        </header>
    )
}