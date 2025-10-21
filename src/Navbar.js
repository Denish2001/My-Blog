// Navbar.js
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './CSS/navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Custom SVG icon for hamburger menu
    const MenuIcon = () => (
        <svg viewBox="0 0 24 24" className="menu-icon">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
    );

    const CloseIcon = () => (
        <svg viewBox="0 0 24 24" className="close-icon">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    );

    return ( 
        <nav className="navbar-container">
            <div className="navbar-content">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <img src="Logo.png" alt="The PGD Blog" className="logo-image" />
                    <span className="logo-text">The PGD Blog</span>
                </Link>
                
                {/* Hamburger menu icon */}
                <button 
                    className="navbar-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
                
                <div className={`navbar-links ${isMenuOpen ? 'navbar-active' : ''}`}>
                    <Link to="/" onClick={closeMenu} className="navbar-link">
                        <span className="link-text">Home</span>
                        <span className="link-underline"></span>
                    </Link>
                    <Link to="/AllStories" onClick={closeMenu} className="navbar-link">
                        <span className="link-text">All Stories</span>
                        <span className="link-underline"></span>
                    </Link>
                    <Link to="/About" onClick={closeMenu} className="navbar-link">
                        <span className="link-text">About</span>
                        <span className="link-underline"></span>
                    </Link>
                    <Link to="/Contact" onClick={closeMenu} className="navbar-link">
                        <span className="link-text">Contact</span>
                        <span className="link-underline"></span>
                    </Link>
                    <Link to="/Team" onClick={closeMenu} className="navbar-link">
                        <span className="link-text">Team</span>
                        <span className="link-underline"></span>
                    </Link>
                    
                </div>
            </div>
            
            {/* Overlay for mobile menu */}
            {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
        </nav>
     );
}

export default Navbar;