import './Header.css';

function Header() {
    return(
        <header className='site-header'>
            <a className='brand' href='#hero'>
                Saffron & Stone
            </a>

            <nav className='header-nav' aria-label='Main navigation'>
                <a href='#menu'>Menu</a>
                <a href="#reservation">Reservations</a>
                <a href="#contact">Contact</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    )
}

export default Header;