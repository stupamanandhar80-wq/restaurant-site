import { useRef, useState } from 'react';
import './Header.css';

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
            <a className='brand' href='#hero' onClick={closeMenu}>
                Saffron & Stone
            </a>

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
                <a href='#menu' onClick={closeMenu}>
                    Menu
                </a>
                <a href="#reservation" onClick={closeMenu}>
                    Reservations
                </a>
                <a href="#contact" onClick={closeMenu}>
                    Contact
                </a>
            </nav>
        </header>
    )
}

export default Header;