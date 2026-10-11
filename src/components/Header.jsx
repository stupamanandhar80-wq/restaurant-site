import { useRef, useState } from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router';

function Header() {

    const [isOpen, setisOpen] = useState(false);
    const menuButtonRef = useRef(null);
    function toggleMenu() {
        setisOpen((previousValue) => !previousValue);
    }

    function closeMenu() {
        setisOpen(false);
    }

    function handleKeyDown () {
        if(event.key === 'Escape' && isOpen) {
            closeMenu();
            menuButtonRef.current?.focus();
        }
    }

    function handleBlur (event) {
        if(!event.currentTarget.contains(event.relatedTarget)) {
            closeMenu();
        }
    }

    return(
        <header
            className='site-header'
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        >
            <Link className='brand' to="/" onClick={closeMenu}> 
                Saffron & Stone
            </Link>

            <button
                ref={menuButtonRef}
                className='menu-toggle'
                type='button'
                aria-expanded = {isOpen}
                aria-controls='main-navigation'
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                onClick={toggleMenu}
            >
                {isOpen ? 'Close' : 'Open'}
            </button>

            <nav 
                id='main-navigation'
                className= {`header-nav ${isOpen ? 'is-open' : ''}`} 
                aria-label='Main navigation'
            >
                <NavLink to="/" end onClick={closeMenu}>
                Home
                </NavLink>

                <NavLink to="/menu" onClick={closeMenu}>
                Menu
                </NavLink>

                <NavLink to="/about" onClick={closeMenu}>
                About
                </NavLink>

                <NavLink to="/reservations" onClick={closeMenu}>
                Reservations
                </NavLink>

                <NavLink to="/contact" onClick={closeMenu}>
                Contact
                </NavLink>
            </nav>
        </header>
    )
}

export default Header;